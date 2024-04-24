const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  // 1. Check incoming data
  console.log(req.body);

  // 2. DesStructure the incoming data
  const { firstName, lastName, email, password } = req.body;

  // 3. Validate the data (if empty, stop the process and send response)
  if (!firstName || !lastName || !email || !password) {
    // res.send("Please enter all fields");
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  // 4. Error Handling(try catch)
  try {
    // 5. Check if the user is already registered
    const existingUser = await userModel.findOne({ email: email });
    // 5.1 if user found: Send response
    // 5.1.1 stop the process
    if (existingUser) {
      return res.json({
        status: false,
        message: "User Already Exists",
      });
    }

    // Hash the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // 5.2 if user is new
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    // Save to database
    await newUser.save();

    // Send the response
    res.json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  // 1. Check incoming data
  console.log(req.body);
  // 2. DeStructure the incoming data
  const { email, password } = req.body;
  // 3. Validate the data
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }
  // 4. Error handling (try catch)
  try {
    // 5. find the user
    const existingUser = await userModel.findOne({ email: email });
    // 5.1 If user not found : Send response
    if (!existingUser) {
      // 5.1.1 stop the process
      return res.json({
        success: false,
        message: "User not registered",
      });
    }
    // 5.2 if user found :
    // 5.2.2 match the password:
    const userPassword = existingUser.password;
    if (userPassword != password) {
      // 5.2.3 if password doesn't match : Send response
      return res.json({
        success: false,
        message: "Password mismatch",
      });
    }
    // 5.2.1 hash the password
    // 5.2.4 if password matches: login and send successful response
    res.json({
      success: true,
      message: "Login ",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Exporting
module.exports = {
  createUser,
  loginUser,
};
