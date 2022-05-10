const express = require("express");
const { signup, signin } = require("../controller/user");
const { isAuth } = require("../middleware/auth");
const { registervalidator, validation, loginvalidator } = require("../middleware/validator");
const router = express.Router();
router.post("/signup",registervalidator(),validation, signup);

router.post("/signin",loginvalidator(),validation, signin);

router.get("/current",isAuth,(req,res)=>{
    res.send(req.user)
})
module.exports = router;
