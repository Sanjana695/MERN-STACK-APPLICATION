const User = require("../Models/User");
const bcrypt = require("bcrypt");
const authenticate = require("../Middlewares/authenticate");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(422);
  }
  try {
    const userExist = await User.findOne({ username: username });

    if (userExist) {
      return res.status(422).json({ error: "User Already Exist!" });
    }
    const user = new User({ username, email, password });
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
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json({ msg: "Please fill field!" });
    }
    const userLogin = await User.findOne({ username: username });
    console.log("In login" + userLogin);
    if (userLogin) {
      //compare password with your registered password.
      bcrypt.compare(password, userLogin.password, (err, validated) => {
        if (validated) {
          const token = jwt.sign(
            { username: userLogin.username },
            process.env.SECRET_KEY,
            { expiresIn: 30 * 60 }
          );
          res.status(200).json({ token, userLogin });
        } else {
          res.status(400).json({ msg: "Invalid Credentials" });
        }
      });
      //now generate token and stored it in database
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get all user
const userList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.send(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).send({ msg: "User Does not exist!" });
  }
};

module.exports = { signup, login, userList, deleteUser };
