const router=require('express').Router();
const userController=require('../controllers/userControllers')

// Creating user registration route
router.post('/create',userController.createUser)

module.exports=router
