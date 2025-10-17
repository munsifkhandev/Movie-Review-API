const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

module.exports = {
  registerUser,
};
