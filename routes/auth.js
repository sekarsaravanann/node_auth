const express=require("express");

const userController=require("../controllers/users"); //initialize controllers
const { route } = require("./pages");
const router=express.Router()  //for mentioning express route module

router.post('/register',userController.register); //route by post from any req hit from /register

router.post('/login',userController.login); //route by post from any req hit from /login 
router.post('/logout',userController.logout); //route by post from any req hit from /logout 

router.post('/forgot_password',userController.passwordlink); //route by post from any req hit from /logout 
router.post('/reset-password',userController.updateuser_pass)

router.get('/reset-password/',userController.identifyuser); //route by post from any req hit from /logout 


module.exports=router;  //exporting the route variable 