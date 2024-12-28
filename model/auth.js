const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({

    email:{type:String,unique:true},
    role:{type:String, enum:['Admin',"User"],default:'User'},
    password:{type:String,required:true},
})

module.exports = mongoose.model('User',userSchema)