
const bcrypt = require("bcryptjs");
const {User} = require("../model/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) =>  {
   var email = req.body.email;
    User.findOne({email:email, isActive:true}, (err,user)=>{
        if(!user){
            return res.json({status: 400, message:"Invalid email"});
        };
    
       
        bcrypt.compare(req.body.password, user.password,function(err,validPassword){
            // if (err) throw err;
            console.log(validPassword)
            if(validPassword){
                return res.json({status: 400, message:"Invalid password"});
             }
             
             console.log(user)
    
             const token = user.generateAuthToken();
             
             return res.json({status: 200, message: token, user:user});

        });
       
        
    });
}); 

module.exports = router;