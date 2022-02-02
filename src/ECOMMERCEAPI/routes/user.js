const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
  //Check the password before updating
  if(req.body.password)
  {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.AES_PASSWORD).toString();
  }

  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      //Set the information in the body
      $set: req.body
    },{new: true})
    res.status(200).json(updatedUser)

  }catch(error){
    res.status(500).json(error)
  }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
  try{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted...")
  }catch(error){
    res.status(500).json(error)
  }
})

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res)=>{
  try{
    const user = await User.findById(req.params.id)
    const {password, ...others} = user._doc;
    res.status(200).json(others);
  }catch(error){
    res.status(500).json(error)
  }
})

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
  try{
    const query = req.query.new
    // if query return last five users else return all users
    const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
    res.status(200).json(users);
  }catch(error){
    res.status(500).json(error)
  }
})

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
  const date = new Date()
  //Return the last year
  const lastYear = new Date(date.setFullYear(date.setFullYear() -1))

  try{
    const data = await User.aggregate([
      //Try to match the users whose "createdAt" is less than today and greater than last year
      { $match: { createdAt: { $gte: lastYear} }},
      //Create month variable and set it with the month value of "createdAt"
      { $project: { month:{ $month: "$createdAt"} }},
      //Group the users by month
      { $group: { _id : "$month", total: {$sum: 1}}}
    ])
    res.status(200).json(data)
  }catch(error){
    res.status(500).json(error)
  }
})

module.exports = router