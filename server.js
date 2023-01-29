
require('dotenv').config()
//require('dotenv').config({path:'F:\flutter\flutterandnodeapi\.env'})

const express=require('express')  //for pull express librabry
const app =express()
const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)


app.listen(3000,()=>console.log('server starrted'))