const userModel = require("../models/userModel");

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
    // 5.2 if user is new
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    // Save to database
    await newUser.save();

    // Send the response
    res.json({
      success: True,
      message: "User Created Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = (req, res) => {
  // 1. Check incoming data
  // 2. DeStructure the incoming data
  // 3. Validate the data
  // 4. Error handling (try catch)
  // 5. find the user
  // 5.1 If user not found : Send response
  // 5.1.1 stop the process
  // 5.2 if user found :
  // 5.2.1 hash the password
  // 5.2.2 match the password
  // 5.2.3 if password doesn't match : Send response
  // 5.2.4 if password matches: login and send successful response
};

// Exporting
module.exports = {
  createUser,
};
