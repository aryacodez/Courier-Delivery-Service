const User = require('../models/user')

exports.isAdmin=(async(req,res,next)=>{
    if(req.user.role == 'admin'){
        next();
    }
    else{
        return res.status(401).json({message:"Access Denied!!!"})
    }
});