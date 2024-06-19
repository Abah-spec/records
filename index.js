const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.port
const connectionString = process.env.db;

app.use(express.json());

mongoose.connect(`${connectionString}`)
.then(()=>{
    console.log("connection to db is successfully established");
    app.listen(port,()=>{
        console.log(`application is starting on port ${port}`);
    })
}).catch((err)=>{
  console.log("unable to connect to db " + err.message)
});

// db = "mongodb+srv://patienceehizy:O1OZPwrrlCKFWFm1@cluster0.nnvmoj8.mongodb.net/"



const date=new Date
const userSchema= new mongoose.Schema({
    name: {type:String, required:[true, "kindly provide your name"]},
    email: {type: String,unique:[true,"kindly provide your email"]},
    stack:{type:String},
    dateOfBirth:{type:Number, required:true},
    sex:{type:String,required:true, enum: ["male" ,"female"]},
    age:{type:Number}

},{timestamps:true})    

const userModel = mongoose.model('First class', userSchema)
app.get("/", async (req,res)=>{    
    const allStudents = await userModel.find()
    res.status(200).json(allStudents)
});

app.post("/createUser", async (req,res)=>{
    try{
        const{name, email, stack, dateOfBirth, sex, age} = req.body;
        let data = {name, email, stack, dateOfBirth, sex, age};
        let newRecord = await userModel.create(data);
        res.status(201).json({message:'user created', newRecord})
    }catch{
        res.status(400).json({message:"unable to create"})
    }
});

app.put("/updateUser", async (req,res)=>{
    try{
        const {name, email, stack, dateOfBirth, sex, age, state} =req.body;
        let data = {name, email, stack, dateOfBirth, sex, age, state, total:Number};
        let newUpdate = await userModel.update(data);
        res.status(200).json({message : "successfully updated"});

    }catch{
        res.status(400).json({message : "something went wrong"});
    }
    
});

app.delete("/delete",)

    
    
    

    


