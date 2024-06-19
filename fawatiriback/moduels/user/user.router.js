const router = require("express").Router();
const authcontroller = require("./controller/user.controller");
router.post("/signin", authcontroller.userLogin);
router.post("/signup", authcontroller.userSignup);
module.exports = router;
