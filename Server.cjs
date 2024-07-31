const express=require('express');
 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json())
const PORT = 3000;
require("dotenv").config();


 

mongoose.connect( "mongodb+srv://Dheena:dheena123@cluster0.ser6ewc.mongodb.net/chatogram?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  mailid:  {type:String,require:true},
  password: {type:String,require:true},
  confirmpassword: {type:String,require:true},
  name: {type:String,require:true},
  phone: {type:String,require:true}
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  const { mailid, password, confirmpassword, name, phone } = req.body;

  try {
    const existingUser = await User.findOne({ mailid });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new User({ mailid, password, confirmpassword, name, phone });
    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

app.post("/login",async (req,res)=>{
  const {mailid,password}=req.body;
  try{
    const data={mailid,password}
    const user= await User.findOne( data);
    if(user)
    {
      res.send(mailid )
       
    }
    else{
        res.send( "Username Or Password Is Wrong")
       

    }
     
  }
  catch(e){

    console.log("Error"+e)

  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
