const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req,res)=>{
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // Encrypt the password using AES
    password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_PASSWORD).toString(),
  });
  try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(error){
    res.status(500).json(error);
  }
})

router.post("/login", async (req,res)=>{
  try{
    const user = await User.findOne({username: req.body.username});
    // Check if the username exists
    !user && res.status(401).json("Wrong Credentials");
    // Decrypt the password using AES
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.AES_PASSWORD);
    const pass = hashedPassword.toString(CryptoJS.enc.Utf8);
    // Check if the password is correct
    pass !== req.body.password && res.status(401).json("Wrong Credentials");

    const {password, ...others} = user._doc;
    res.status(200).json(others);

  }catch(error){
    res.status(500).json(error);
  }
})

module.exports = router