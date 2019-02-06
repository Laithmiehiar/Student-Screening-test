const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({ 
    email:{
    type:String,
    required:true,
    unique:true
    },
    role:{
        type:String,
       
        }
}, { strict: false });

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, email: this.email, role:this.role},"jwtPrivateKey");
    return token;

}

const User = mongoose.model('users', userSchema);

module.exports.User = User;
