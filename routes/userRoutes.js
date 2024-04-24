const router = require("express").Router();
const userController = require("../controllers/userControllers");

// Creating user registration route
router.post("/create", userController.createUser);

// Creating user login route
router.get("/login", userController.loginUser);

module.exports = router;
