const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')

require('../db/conn')
const User = require('../model/userSchema')


router.post('/signup', async (req,res) => {
    
    try{
        const {name,email,password,cpassword,phone,cafename} = req.body;
    
        if(!name || !email || !password || !cpassword || !phone || !cafename){
            return res.status(422).json({error:"plz fill the field"})
        }

        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"Email already exist"})
        }
        else if(password != cpassword){
            return res.status(422).json({error:"Password not matching"})
        }
        else{
            const user = new User({name,email,password,cpassword,phone,cafename});
            await user.save()
            res.status(201).json({message:"User registered succesfully"})
        }
        
    }
    catch(err){
        console.log(err)
    }
    
})


router.post('/login', async (req,res) => {
    
    try{
        let token;
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(422).json({error:"plz fill the field"})
        }
        const userLogin = await User.findOne({email:email})
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            if(!isMatch){
                res.status(400).json({error:"invalid credentials pass"})
            }
            else{
                const token = await userLogin.generateAuthToken();
                console.log(token)
                res.cookie("jwtoken",token,{
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                });
                res.json({message:"login successfull"})
            }
        }
        else{
            res.status(400).json({error:"invalid credentials"})
        }
    }
    catch(err){
        console.log(err)
    }
})

router.post('/menu', async (req,res) => {
        let data = req.body.order_data
        await data.splice(0,0,{Order_date:req.body.order_date})
        let eId = await Order.findOne({'email':req.body.email})
        console.log(eId)
        if(eId == null){
            try{
                await Order.create({
                    email:req.body.email,
                    order_data:[data]
                }).then(()=>{
                    res.json({success:true})
                })
            }catch(error){
                console.log(error)
                res.status(400).json({error:"Server Error"})
            }
        }
    
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                                         {$push:{order_data:data}}).then(()=>{
                                            res.json({success:true})
                                         })
                                        }catch(error){
                                            res.send("Server Error",error.message)
                                        }
        }
    
})

router.post('/owner', async (req,res) => {
    try{
        let myData = await Order.findOne({'email': req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.status(error).send("Server Error",error.message)
    }
})

router.get('/home',authenticate,(req,res) => {
    console.log('Hello');
    res.json(req.rootUser);
});

router.post('/setmenu', async (req, res) => {
    const { email, menu } = req.body;

  try {
    // Find the user by their user ID
    const user = await User.findOne({email:email});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's menu field with the new data
    user.menu = menu;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Menu updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu' });
  }
});

router.get('/logout',(req,res) => {
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send("user logout")
})

router.get('/getmenu', async (req, res) => {
  const userEmail = req.query.email; // Get the user's email from the request query
  try {
    // Use Mongoose to find the user by their email and retrieve their menu data
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Send the user's menu data in the response
    res.status(200).json(user.menu);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching menu data' });
  }
});

router.get('/getid', async (req, res) => {
    const userEmail = req.query.email; // Get the user's email from the request query
    try {
      // Use Mongoose to find the user by their email and retrieve their menu data
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Send the user's menu data in the response
      res.status(200).json(user._id.toString());
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error fetching menu data' });
    }
  });

  router.get('/getme', async (req, res) => {
    const id = req.query.id;
    const tableNumber = req.query.n;
    try {
      // Use Mongoose to find the user by their email and retrieve their menu data
      const user = await User.findOne({ _id:id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
        const token = await userLogin.generateAuthTokenOrders(tableNumber);
        console.log(token)
        res.cookie("jwtoken",token,{
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                });
      res.status(200).json(user.menu);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error fetching menu data' });
    }
  });

module.exports = router