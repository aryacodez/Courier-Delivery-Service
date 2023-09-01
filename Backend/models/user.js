const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const userSchema = mongoose.Schema({  
    photo:{
        id:String,
        url:String
    },
    name:{
        type:String,
        required:[true,'Please Provide Your Name']
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email already Exists']
    },
    password:{
        type:String,
        required:[true,'Please Provide Your Password'],
        minLength:[5,'Password must be atleast 5 characters'],
        select: false
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    createdAt:{
        type:Date,
        default: Date.now
    }
});

//Encrypting password before saving
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
});


//Decrypting password for login i.e comparing
userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword.toString(),this.password)
}


//create and return JWT Token
userSchema.methods.getJWT =function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'2h'})
}
module.exports = mongoose.model('User',userSchema);