const authorise = (role)=>{
    // console.log(role)
    return (req,res,next)=>{
        const roles = req.body.role
        // console.log("ROLES",roles)
        if(role.includes(roles)){
            next();
        }else{
            res.send("You are not authorise");
        }
    }
}

module.exports ={
    authorise
}