const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create = (req, res) => {
  console.log(req.body);
  res.render("Create");
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422);
  }
  try {
    const userExist = await User.findOne({ username: username });

    if (userExist) {
      return res.status(422).json({ error: "User Already Exist!" });
    }
    const user = new User({ username, password });
    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ msg: "User Registered Successfulyy!" });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    let token;
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json({ msg: "Please fill field!" });
    }
    const userLogin = await User.findOne({ username: username });

    if (userLogin) {
      //compare password with your registered password.
      const isMatch = await bcrypt.compare(password, userLogin.password);
      //now generate token and stored it in database
      token = await userLogin.generateAuthToken();
      console.log(token);

      //name of cookie and value
      res.cookie("jwtoken", token, {
        //add 30 days in curerrent  date for expire the token
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ msg: "Invalid Credentials" });
      } else {
        res.json({ msg: "User Login Successfully!" });
      }
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { create, signup, login };
