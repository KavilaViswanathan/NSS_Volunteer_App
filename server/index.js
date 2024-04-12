const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const adminrouter = require('./router/admin_router')
const userrouter = require('./router/user_router')

app.use(cors())
app.use(express.json());

const port = process.env.PORT || 27000;
const uri = 'mongodb://127.0.0.1:27017/NSS_Volunteer'

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))

app.use('/admin',adminrouter)
app.use('/user',userrouter)
app.listen(port ,()=>{
    console.log(`server is running on the port number ${port}`);
})