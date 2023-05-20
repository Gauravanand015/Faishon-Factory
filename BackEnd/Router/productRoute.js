const  exp = require("express");
const { CartModel } = require("../model/cartModel");
const { ProductModel } = require("../model/productsModel");
// const { upload } = require("./multer");
const productRouter = exp.Router()
const cloud = require("cloudinary").v2
require("dotenv").config();
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname)
//     }
//   });
  
  const upload = multer({ dest: "uploads/" });

cloud.config({
    cloud_name: 'dcqylnqry',
    api_key: '796765436163833',
    api_secret: process.env.apiSecretKey,
    secure: true
});

productRouter.get("/allData",async(req,res)=>{
    try {
        const allData = await ProductModel.find()
        res.json(allData);
    } catch (error) {
        res.json(error)
        console.log(error);
    }
})

productRouter.post("/create",upload.single("productImage"),async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.json("Hello");
    // console.log(file)

    // const allData = await ProductModel.find()
    // res.json(`${allData.length}`)
    // console.log(req.file)
    // cloud.uploader.upload(file.tempFilePath, async (err, result) => {
    //     console.log(result)
    //     try {
    //         if(allData.length>=0){
    //             const data = new ProductModel({
    //                 img : result.url,
    //                 Title:req.body.title,
    //                 price:req.body.price,
    //                 Delivery:req.body.delivery,
    //                 Rating:req.body.rating,
    //                 reviews:req.body.reviews,
    //                 More:req.body.more,
    //                 product_id:+(allData.length+5)
    //         })
    //             await data.save()
    //             console.log(data)
    //             res.json({msg:"Created data"});
    //         }else{
    //             console.log(err);
    //             res.json("Something Is Wrong !!")
    //         }
    //     } catch (error) {
    //         res.json("Something is Wrong !!")
    //         console.log(error)
    //     }
    // })
})

// productRouter.post("/create", async (req, res) => {
    // console.log(req.body)
    // res.send(req.body)
    // try {
        // const allData = await ProductModel.find();
    //     const result = await cloud.uploader.upload(req.file.path);
    //     const data = new ProductModel({
    //         img: result.url,
    //         title: req.body.title,
    //         price: req.body.price,
    //         delivery: req.body.delivery,
    //         rating: req.body.rating,
    //         reviews: req.body.reviews,
    //         more: req.body.more,
    //         product_id: allData.length + 1,
    //     });
    //     await data.save();
    //     console.log(data);
    //     res.json({ msg: "Created data" });
    // } catch (error) {
    //     console.log(error);
    //     res.json("Something went wrong!!");
    // }
// });


productRouter.patch("/editnupdate/:product_id",async (req,res)=>{
    const id = req.params.product_id;
    const data = req.body
    try {
        const update =  await ProductModel.updateOne({product_id:id},data)
        res.json("Updated")
        console.log(update);
    } catch (error) {
        res.json(error);
    }
})

productRouter.delete("/delete/:product_id",async (req,res)=>{
    const id = req.params.product_id;
    try {
        const del =  await ProductModel.deleteOne({product_id:id})
        await CartModel.deleteOne({product_id:id})
        res.json("Deleted")
        console.log(del);
    } catch (error) {
        res.json(error);
        console.log(error);
    }
})

module.exports={
    productRouter
}
