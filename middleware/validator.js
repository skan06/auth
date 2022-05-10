const { validationResult, check } = require("express-validator");

exports.registervalidator = () => [
  check("name", "name is required").not().isEmpty(),
  check("email", "email valid").isEmail(),
  check("password", "password valid!").isLength({ min: 6 }),
];

exports.loginvalidator = () => [
  check("email", "email valid").isEmail(),
  check("password", "password valid!").isLength({ min: 6 }),
];
exports.validation=(req,res,next)=>{
  const error=validationResult(req)
  if(!error.isEmpty){
    return res.status(400).json({ errors: error.array() });
  }
  next()
}