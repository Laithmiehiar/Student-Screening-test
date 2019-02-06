var express = require('express');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
var router = express.Router();
const {User} = require('../model/user');
const sendMail = require('../config/sendMail')

//get all (staff,student) users
router.get('/all',auth, async (req, res, next)=> {
  console.log('all')
  const results = await User.find({}).where('role').ne(['admin']);
 
  res.json(results);
});

/* GET users listing. */
router.get('/',async (req, res, next)=> {
  const results = await User.find();
 
  res.json(results);
});


router.get('/:id',auth,  async (req, res, next)=> {
  const results = await User.findById({ _id: req.params.id});
 
  res.json(results);
});



router.get('/role/:role',auth, async (req, res, next)=> {
  const results = await User.find({}).where('role').in([req.params.role]);
 
  res.json(results);
});


router.post('/', async (req, res, next)=> {
  console.log('post');

  let user = await User.findOne({
    email:req.body.email
  })

  if(user){
    return res.json({status: 400, message:"User alredy Registerd"});
  };

  const tmp = req.body
  tmp.dateCreated = new Date();
  var record = new User(tmp)
   
  if (req.body.isStudent === true){
    record = await record.save(); 
    return res.json({status: 200, record: record});
  }


  try {
    const salt = await bcrypt.genSalt(10);
    record.password = await bcrypt.hash(record.password, salt);
    record = await record.save(); 
  } catch (e) {
    console.log('Error Occured - post-users api', e)
  }


  const token =  record.generateAuthToken();
  res.header("x-auth-token", token).json({status: 200, record: record});

  
});

router.delete('/:id',auth, async (req, res, next)=> {
  const results = await User.findByIdAndRemove(req.params.id);
 
  res.json({status:200, message: results});
});

router.patch('/:id', async (req, res, next)=> {

  const results = await User.update({'_id': req.params.id},{$set : req.body});
 
  res.json({status:200, message: results});
});

router.patch('/student/answer/:id', async (req, res, next)=> {
  console.log(req.body)
  console.log('server: '+ req.params.id)
     await User.find({'_id': req.params.id, 'questions.question':req.body.question}, function(err,findResult){
    if(findResult.length > 0){
         User.update({'_id': req.params.id, 'questions.question':req.body.question},{$push: {"questions.$.answers":req.body.answer}},{upsert:true},function(err,ress){
          res.json({status:200, message: ress});

       });
    }else{
     User.update({'_id': req.params.id}, {$push: {"questions":{"question":req.body.question, "answers": [req.body.answer]}}},{upsert:true},function(err,ress){
       res.json({status:200, message: ress});
     });

    }
  //  console.log(results)

  });

});

router.patch('/student/:id', async (req, res, next)=> {
   ///for testing (works-- now need to pass value from Angula app)
 User.update({'_id': req.params.id},{$set : req.body}, function(error, results){
  var email = req.body.email;
  var name = req.body.name
  User.findOne({email:email}, (err,user)=>{
           
           const token = user.generateAuthToken();
           let to = email;
           let subject  = "Programming TEST!";
           let mail = `<h1>Congratulations!!</h1>

           <h3>Dear ${name}</h3>
             <p>You  are required to take a 2 hours 3 questions programming test,</p>
             <p>by passing this test you will  be accepted at this university based on the results fo the test.
             click on the link below to take your test  </p>
             <table width="100%" cellspacing="0" cellpadding="0">
         <tr>
             <td>
                 <table cellspacing="0" cellpadding="0">
                     <tr>
                         <td style="border-radius: 2px;" bgcolor="#ED2939">
                             <a href="http://localhost:4200/passwordlessAuth/${token}" target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                                 Click here to take the test!            
                             </a>
                         </td>
                     </tr>
                 </table>
             </td>
         </tr>
       </table>
       <br>
            <p> <b>NOTE: <i>you can only take this test once</i></b></p>`;
             
         sendMail(to,subject,mail);
           
           return res.json({status: 200, message: token, results:results});

      });
     
      
  });
});

module.exports = router;
