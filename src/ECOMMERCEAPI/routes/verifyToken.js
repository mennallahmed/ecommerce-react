const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
  const authHeader = req.headers.token
  if(authHeader)
  {
    ///* Verify the token *///
    // Split the header and get the token value
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (error, user)=>{
      if(error) res.status(403).json("Token is not valid!")
      // If valid token, then assign the user to the request
      req.user = user;
      next()
    })
  }
  else{
    // Return error if there is no authHeader
    return res.status(401).json("You are not authenticated!")
  }
}

const verifyTokenAndAuthorization = (req, res, next) =>{
  verifyToken(req, res, ()=>{
    // Check if the token belong to client/admin or not
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();   
    }
    else{
      res.status(403).json("You are not allowed to do that!")
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) =>{
  verifyToken(req, res, ()=>{
    // Check if the token belong to admin or not
    if(req.user.isAdmin){
      next();   
    }
    else{
      res.status(403).json("You are not allowed to do that!")
    }
  })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}