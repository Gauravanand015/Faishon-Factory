const exp = require("express");
const { ProductModel } = require("../model/productsModel");
const description_route = exp.Router()


description_route.get("/product/:product_id",async(req,res)=>{
    const id =  req.params.product_id;
    const find_product = await ProductModel.findOne({product_id:id})
    if(!find_product){
        return res.send("Out Of Stock!!")
    }else{
    res.send(find_product)
    }
})

module.exports={
    description_route
}