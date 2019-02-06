const mongoose = require("mongoose");
require('dotenv').config()

const connect = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/team4?retryWrites=true` ,{useNewUrlParser:true})
.then(()=> console.log("Connected to DB!"))
.catch(error => console.log("Couldnt connect to DB!", error.message));


module.exports = connect;