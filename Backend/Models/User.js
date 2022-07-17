const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

//userschma is the instance
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 5, function (err, hash) {
    user.password = hash;
    next();
  });
});
//we are generating tokens method is the instance method of userschema
UserSchema.methods.generateAuthToken = async function () {
  try {
    //through this._id we can get user id
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

//User is the name of schema and in monodb it will become small and will be plural and become users
const User = mongoose.model("User", UserSchema);
module.exports = User;
