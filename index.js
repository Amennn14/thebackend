const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5001
const db = require('./config/db')
const cors = require('cors')
const UserRoot = require('./route/auth')
const router = require('./route/maison')
db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/auth",UserRoot)
app.use("/home",router)

app.listen(port,err=>{
    err?console.log(err): console.log(`go to the port ${port}`)
})
