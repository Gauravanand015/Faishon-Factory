const mongoose = require("mongoose");

const cartSchema =  mongoose.Schema({
    img:String,
    Title:String,
    price:String,
    product_id:Number,
    userID:String,
    token:String
},{_id:false})

const CartModel = mongoose.model("cartitem",cartSchema)

module.exports={
    CartModel
}