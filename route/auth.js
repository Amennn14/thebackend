
const express = require('express')
const UserRoot = express.Router()
const {registerValidation,validation,loginValidation} = require('../middelware/RegisterValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isAuth}=require('../middelware/isAuth')
const User= require("../model/auth")



UserRoot.post('/register',registerValidation,validation,async(req,res)=>{
    try{
    const {email,userName,password}= req.body
    const foundAuth = await User.findOne({email})
    if(foundAuth) {return res.status(404).json({msg:" el email deja mawjoud bara logi 3ych khouya ou okhty"})}
    const newAuth = await new User(req.body)
    //bcrypt 
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    newAuth.password = hash 
    newAuth.save()
    res.status(200).json({msg:'welcome to ur note pad',newAuth})
    }catch(err){
        console.log(err)
        res.send(err.message)
    }
    })
    //=>http://localhost:5002/auth/login
    
    UserRoot.post('/login', loginValidation,validation,async (req, res) => {
        try {
          const { email, password } = req.body;
          const foundAuth = await User.findOne({ email });
          if (!foundAuth) {
            return res.status(404).json({ msg: "rak mkch msejel, bara register 3aych khouya ou okhty" });
          }
      
          // Comparer le mot de passe fourni avec le mot de passe stocké
          const match = await bcrypt.compare(password, foundAuth.password);
          if (!match) {
            return res.status(404).json({ msg: "rak ghalit fil mdsp mte3ik" });
          }
          // Création du token avec le payload
          const payload = { id: foundAuth._id };
          const token = jwt.sign(payload, process.env.privateKey);
          res.status(200).json({ msg: "ur welcome, ya mar7abe", token, foundAuth });
        } catch (err) {
          console.log(err);
          res.send(err.message)

          res.status(500).json({ msg: "Something went wrong, please try again." });
        }
      });
    //route get profil view profil 
    //http://localhost:5002/auth/myaccount
    
    UserRoot.get('/myaccount',isAuth,(req,res)=>{
      try{
    res.send(req.user)
      } catch(err){ console.log(err)}})


module.exports = UserRoot
