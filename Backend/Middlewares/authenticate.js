const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const authenticate = async (req, res, next) => {
  try {
    //get token that stored in browser after login
    const token = req.cookies.jwttoken;

    //verify the token and compare with secret key that is present in .env file
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    //get user data that he/she exist or not with the help of id
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User Not Found!");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(error);
  }
};

module.exports = authenticate;
