const { application } = require("express");
const express=require("express");
const router=express.Router()  //for mentioning express route module
//use the controller to manage the routes and middleware
const userController=require('../controllers/users')

const path = require("path");

//initial landing page
router.get(["/","/login"],(req,res)=>  //change the app object to router object
{

    res.render("heropage");
})

//route for render the register page
router.get("/register",(req,res)=>
{

    res.render("register");
})

//route for dashboard 
router.get("/dash",userController.isLoggedIn,(req,res)=>
{
   

    if(req.user)  //check the user value is vailable or not
    {
        res.render("dashboard")
    }
    else
    
    {
        // alert('sd')
    //if not available redirect again loign  page
        res.redirect('/login')
    }
    

}



)


//route for home and use thr controller for middleware
//userController.isLoggedIn middleware 
router.get("/home",userController.isLoggedIn,(req,res)=>
{

    // console.log(req.name)
    // res.render("home")


    if(req.user)  //check the user value is vailable or not
    {
//if available render the home
        res.render('home',{user :req.user});

    }
    else

    {
//if not available redirect again loign  page
        res.redirect('/login')
    }
})

router.get('/logout',userController.logout,(req,res)=>

{

console.log('somethig')

})

//forgot password link sending 


    router.get("/forgot_password",(req,res)=>{

// res.send('email askkg')
res.render('forgotlink_inupt');
// res.sendFile('forgotlink_inupt.html');
// res.sendFile(path+'/forgotlink_inupt.html');
// res.sendFile(path.join('views/forgotlink_inupt.html'));
})


router.post('/reset-password_link',userController.passwordlink,(req,res) =>
{

console.log('routeded')
res.render('info_about_resetpass')

})

router.get('/reset-password/:id/:token',userController.identifyuser,(req,res) =>
{
 

    const user_id=req.params.id;
    const user_token=req.params.token;
    // console.log("user_id",user_id)
    // console.log("user_token",user_token)
    

// res.render('forgotpassword')

})


router.post('/reset-password/:id/:token',userController.updateuser_pass,(req,res) =>
{
 
// console.log('posr')
//     const user_id=req.params.id;
//     const user_token=req.params.token;
    // console.log("user_id",req)
    // console.log("user_token",user_token)
    

    res.redirect('/login')

})






module.exports=router; //export the module