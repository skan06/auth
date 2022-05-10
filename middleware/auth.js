const jwt = require("jsonwebtoken");
const User = require("../model/User");
exports.isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).send({ errors: [{ msg: "not auth!" }] });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({ _id: decoded.id });
    if (!foundUser) {
      res.status(401).send({ errors: [{ msg: "not auth!" }] });
    }
    req.user = foundUser;
    next();
  } catch (error) {
    res.status(200).send({ errors: [{ msg: "not authorized!" }] });
  }
};
