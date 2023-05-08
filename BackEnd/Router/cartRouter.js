const exp = require("express");
const jwt = require("jsonwebtoken");
const { ProductModel } = require("../model/productsModel");
const { CartModel } = require("../model/cartModel");
const { validateUser } = require("../middleware/userAuthenticate");
const { authorise } = require("../middleware/authorise");
const cartRouter = exp.Router()
require("dotenv").config();

cartRouter.get("/getCartData",validateUser,authorise(["admin","user"]),async(req,res)=>{
    console.log("REQUEST",req.body)
    try {
        if(req.body.userID){
            const cartData = await CartModel.find({userID:req.body.userID})
            res.json(cartData)
        }else{
            console.log({"MESSAGE":"ERROR WHILE VERFYING JWT","ERROR":error})
            res.json("Something Went Wrong!!")
        }
    } catch (error) {
        console.log("ERROR get Cart",error)
        res.json("Something Went Wrong!!")
    }
})

cartRouter.post("/itemPostatCart/:product_id",validateUser,authorise(["admin","user"]),async(req,res)=>{
    console.log("Request.BODY",req.body)
    const pro_id = req.params.product_id;
    const product_data = await ProductModel.find({product_id:pro_id})
    product_data[0].userID = req.body.userID
    try {
        if(product_data[0].product_id==pro_id){
            console.log("PRODUCT DATA",product_data)
            const addToCart = await CartModel.insertMany(product_data[0])
            console.log("ADD TO CART",addToCart)
            res.json("Add to the Cart")
        }else{
            res.json("Product is not available")
        }
    } catch (error) {
        res.json("Something Went Wrong in itemPost Route!!")
        console.log(error)
    }
})

cartRouter.delete("/deleteItemfromCart/:product_id",validateUser,authorise(["admin","user"]),async (req,res)=>{
    const pro_id = req.params.product_id;
    const product_data = await CartModel.find({userID:req.body.userID})
    const cart_pro_userID = product_data[0].userID
    const users_userId = req.body.userID
    console.log(users_userId,cart_pro_userID)
    try {
        if(users_userId==cart_pro_userID){
            // console.log(product_data)
            const deleteFromCart = await CartModel.deleteOne({product_id:pro_id})
            console.log(deleteFromCart)
            res.json("item is deleted from the Cart")
        }else{
            res.json("wrong input")
        }
    } catch (error) {
        res.json("Something Went Wrong!!")
        console.log(error)
    }
})
module.exports={
    cartRouter
}