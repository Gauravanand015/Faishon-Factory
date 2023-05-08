const exp = require("express");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/usersModel");
const userRouter = exp.Router()
require("dotenv").config();

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass} = req.body;
    const mail = await UserModel.find({email});
    // console.log(mail)
    if(mail.length>0){
        return res.json("This email is already registered try another email!!")
    }
    try {
        bcrypt.hash(pass, 7, async (err, encrypt) =>{
            if(err){
                res.json("Enter Valid Details!!")
                console.log(err);
            }else{
                const userData =  new UserModel({name,email,pass:encrypt});
                await userData.save();
                res.json("New User Has been Registered!!")
            }
        })
    } catch (error) {
        res.json("Somthing Went Wrong while registering")
        console.log(error)
    }
})

userRouter.post("/login_user", async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const find = await UserModel.find({email:email})
        // console.log("FindROLE",find)
        if(find.length>0){
            console.log(find)
            bcrypt.compare(pass, find[0].pass, (err, result)=>{
                if(err){
                    res.json({msg:"email or password is not correct please try again"})
                    console.log(err)
                }else{
                    let token = jwt.sign({ userID: find[0]._id,role:find[0].role,name:find[0].name}, process.env.userSecretKey);
                    res.json({"msg":"Login Successfully","token":token,"name":find[0].name})
                }
            });
        }
    } catch (error) {
        res.json("Somthing Went Wrong while login !!")
        console.log(error)
    }
})

module.exports={
    userRouter
}