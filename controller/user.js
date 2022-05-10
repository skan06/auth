const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
//sign up
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ errors: [{ msg: "exist" }] });
    }
    //cryptage (bcrypt)
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...req.body });
    //bcrypt
    newUser.password = hashedpassword;
    //json web token
    const token = jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"1h"})
    await newUser.save();
    res.status(200).send({ msg: "welcome", user: newUser ,token});
  } catch (error) {
    res.status(400).send({ msg: "failed", error });
  }
};

//signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "bad credantial" }] });
    }

    //check password:compare
    const checkpassword = await bcrypt.compare(password, foundUser.password);
    if (!checkpassword) {
      return res.status(400).send({ msg: "bad credantial" });
    }
    const token = jwt.sign({id:foundUser._id},process.env.SECRET_KEY,{expiresIn:"1h"})


    res.status(200).send({ msg: "welcome back ! ", user: foundUser,token });
    
  } catch (error) {
    res.status(400).send({ msg: "failed", error });
  }
};
