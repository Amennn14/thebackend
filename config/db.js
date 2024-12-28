const mongoose = require('mongoose')

const db=async()=>{
    try{
    await  mongoose.connect('mongodb+srv://amennn141:kciv1YkmmiKeP97R@cluster0.iefqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  console.log('MongoDB Connected');    }catch(err){
    
        console.log(err)
    }
}

module.exports = db