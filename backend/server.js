const express=require('express');
require("dotenv").config();
const morgan=require('morgan');
const recipesRoutes=require('./routes/recipes');
const mongoose=require('mongoose');
const cors=require('cors');


const app=express();
const mongoURL="mongodb+srv://gloriawinnyunt:test123@mern-cluster.bcog5cu.mongodb.net/?retryWrites=true&w=majority&appName=MERN-cluster";

mongoose.connect(mongoURL)
.then(()=>{
    console.log("connected to DB");
    app.listen(process.env.PORT,()=>{
        console.log('app is listening on localhost: '+process.env.PORT);
    })
})
app.use(cors()); //for local development only, not suitable for deployment
app.use(express.json())
app.use(morgan('dev'));
app.use('/api/recipes',recipesRoutes);
app.get('/',(req,res)=>{
    return res.json({hello:"world"})
})

