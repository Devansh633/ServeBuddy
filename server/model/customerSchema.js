const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const customerSchema = new mongoose.Schema({
    googleId:{
            type:String
        },
    displayName:{
            type:String
    },
    email:{
            type:String
    },
    image:{
            type:String
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
},{timestamps:true});


customerSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){

    }
}

customerSchema.methods.generateAuthTokenOrders = async function (tableNumber) {
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


const Customer = mongoose.model('CUSTOMER',customerSchema)

module.exports = Customer