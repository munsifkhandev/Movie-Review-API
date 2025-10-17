const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      //      console.log("User with this Email Already Exists..");
      return res.status(400).json({
        success: false,
        message: "User with this Email Already Exists..",
      });
    }
    //    console.log("User with this Email Already Exists..");
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    // console.log("User Registered Successfullyy..");
    return res.status(201).json({
      success: true,
      data: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      message: "User Created Successfullyy..",
    });
  } catch (error) {
    console.error(
      "Server Error Occurred with Registering User..",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error Creating User.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required...",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Details..",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Details..",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      token: token,
      message: "User Logged In Successfullyyy...",
    });
  } catch (error) {
    console.error("Server Error while Logging In..");
    return res.status(500).json({
      success: false,
      message: "Server Error Occurred..",
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const myProfile = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      success: true,
      data: myProfile,
      message: "Profile Displayed Successfully...",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving Profile..",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMyProfile,
};
