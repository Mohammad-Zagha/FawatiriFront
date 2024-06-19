const { userModel } = require("../../../DB/model/user.model");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await userModel.findOne({ email });

    if (!account) {
      return res.status(404).json({ message: `Invalid account for user` });
    }

    if (!account.confirmEmail) {
      return res
        .status(400)
        .json({ message: `Please confirm your email first as a user` });
    }

    const match = await bcrypt.compare(password, account.password);

    if (!match) {
      return res.status(400).json({ message: `Invalid password for user` });
    }

    const token = jwt.sign({ id: account._id }, process.env.logintoken, {
      expiresIn: 60 * 60 * 24,
    });

    return res.status(200).json({
      message: `Done signing in as user`,
      token,
      id: account._id,
      name: account.userName,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `An error occurred during user login`,
      error: error.message,
    });
  }
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      res.status(409).json({ message: "email already exist" });
    } else {
      const hashPassword = await bcrypt.hash(password, parseInt(10));
      const newUser = new userModel({
        email: email,
        userName: name,
        password: hashPassword,
      });
      const savedUser = await newUser.save();

      if (!savedUser) {
        console.log("Failed to register");
        res.status(400).json({ message: "Failed to register" });
      } else {
        const token = jwt.sign({ id: savedUser._id }, process.env.logintoken, {
          expiresIn: "48h",
        });
        res
          .status(201)
          .json({ message: "An account has been created successfully", token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};
module.exports = { userLogin, userSignup };
