const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require("cors");

dotenv.config({ path: "./.env" });
const userController = require("./Controllers/userController");
const authenticate = require("./Middlewares/authenticate");

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/createuser");
// app.use(cors);

app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.get("/userlist", userController.userList);
app.delete(
  "/deleteUser/:id",
  authenticate.authenticate,
  userController.deleteUser
);

app.use("*", function (req, res) {
  res.status(404).json({ msg: "NOT FOUND" });
});

app.listen(PORT, function () {
  console.log(`listening at port ${PORT}`);
});
