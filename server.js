
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Maed", {useUnifiedTopology: true, useNewUrlParser:true, useFindAndModify:false}, (err) =>{ 
    if(!err){
        console.log("success connecting")
    }
    if (err){
        console.log("Error connecting to database")
    }
})