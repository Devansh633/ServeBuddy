const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    cafename:{
        type:String,
        required:true
    },
    orders:[
        {token:{
            type:String,
            required: true
        },table:{
            type:Number,
            required: true
        },
        order_data: {
            type: Array,
            required: true,
        },
        progress:{
            type: String,
            required: true,
        }
    }],
    menu: [
        {
          sectionName: {
            type: String,
            required: true,
          },
          dishes: [
            {
              name: {
                type: String,
                required: true,
              },
              price: {
                type: String,
                required: true,
              },
              availability: {
                type: Boolean,
                required: true,
              },
            },
          ],
        },
      ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.cpassword = await bcrypt.hash(this.password,12)
    }next();
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){

    }
}

userSchema.methods.generateAuthTokenOrders = async function (tableNumber) {
    try {
        let token = jwt.sign({ _id: this._id, table: tableNumber }, process.env.SECRET_KEY);
        this.orders.push({
            token: token,
            table: tableNumber,
            order_data: [],  // Add appropriate order_data if needed
            progress: "pending",  // Set initial progress state
        });
        await this.save();
        return token;
    } catch (err) {
        console.error('Error generating order token:', err);
    }
}


const User = mongoose.model('USER',userSchema)

module.exports = User