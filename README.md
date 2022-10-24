npm install 
npm init -y // to initialize the npm module
install npm i cmds

npm i express mysql dotenv hbs nodemon bcrypt cookie-parser jsonwebbtoken 
app.js

step -1
//initialize the express js
const express=require('express');

simple route
//initial landing page
app.get("/",(req,res)=>
{

    res.send("<h1>hello sekar</h1>");
})



app.listen(5000,()=>{  //listening live sever @ this port

    console.log("server started @ 6000 port");

    //and in package.json declare in the script tag 
    // "scripts": {

    //     "test": "echo \"Error: no test specified\" && exit 1",
    //     "start":"nodemon app.js"
    //   },

    // to start the server -npm start dev
});

step 2 : 

creating my sql object

const mysql=require("mysql");  //creating  object for database


creating connection to db


var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database:"space_mgnt",
  });

  checking connection or verifying  connection

  /   checking connection or verifying  connection

db.connect((err)=>{
if(err)
{

    console.log(err);
}
else
{
    console.log("sql connected")
}
})

step3:

ENV config

app.js

const doenv=require ("dotenv")  //declaring the env

//configuring env (used to password and db security)

doenv.config({
    path:"./.env",
})


create the new file .env 
.env file

 DATABASE=space_mgnt
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASS=''


app.js

// creatind connection to db
var db = mysql.createConnection({

//WITHOUT ENV
	// host: "localhost",
	// user: "root",
	// password: "",
	// database:"space_mgnt",


  //WITH ENV  

    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,

  });


//check db connection is connected or not
//after go next

step 4 :


folder and file creation  like pulic\css\heropage.css
app.js
const path =require('path') //use this npm default package for maintaing the folder structure

after connection checking
const location =path.join(__dirname,"./public");  //join function used to join the 2 paths   
app.use(express.static(location)); // here we giving permission to use this folders as here freedomly,we can get any photos files from this path



step 5 :


hbs handlebars  for view templates
const hbs=require("hbs") //initialize to use the hbs (handle bars)

rules for hbs:

    create the template folder as view
    crearte the temaplate name like heropage.hbs
    use the render function to render the template

const location =path.join(__dirname,"./public");  //join function used to join the 2 paths   
app.use(express.static(location)); // here we giving permission to use this folders as here freedomly,we can get any photos files from this path
app.set("view engine","hbs") //here i am telling use the view engine for view templates from hbs
//initial landing page
app.get("/",(req,res)=>
{

    res.render("heropage");//hbs function
})


step:6
 by hbs

 
app.get("/",(req,res)=>
{

    res.render("heropage");
})

//route for render the register page
app.get("/register",(req,res)=>
{

    res.render("register");
})

template routes
    
    <div class="signup">
         <a href="/register">signup</a>
    </div>

step 7
partial

for using common files like navbars

rules:
create the partials files in views folders

appp.js


const partialpath =path.join(__dirname,"./views/partials");  //join the current path and views partialpath together
hbs.registerPartials(partialpath) 

views templates:

use the files like this   {{> navbar }} //place holders
 

 step8:

 use seperate rouer file for routing

 rules
 create routes in root folder
 inside of this create the pages.js like


 const express=require("express");
const router=express.Router()  //for mentioning express route module


//initial landing page
router.get("/",(req,res)=>
{

    res.render("heropage");
})

//route for render the register page
router.get("/register",(req,res)=>
{

    res.render("register");
})

//route for dashboard 
router.get("/dash",(req,res)=>
{
    res.render("dashboard")
})


//route for home
router.get("/home",(req,res)=>
{
    res.render("home")
})


module.exports=router; //export the module



app.js

import 
app.use('/',require("./routes/pages"));


step 9

controllers

app.js

app.use('/auth',require("./routes/auth"))//passing the routes from here to rotes/auth


create the file auth.js in routes folder



const express=require("express");

const userController=require("../controllers/users") //initialize controllers
const router=express.Router()  //for mentioning express route module

router.post('/register',userController.register); //route by post from any req hit from /register
module.exports=router;  //exporting the route variable 

create the controller folder  and create the user.js file
const express=require("express");

const userController=require("../controllers/users") //initialize controllers
const router=express.Router()  //for mentioning express route module

router.post('/register',userController.register); //route by post from any req hit from /register
module.exports=router;  //exporting the route variable 


step 10

getting the form data in controller/users.js


controller/users.js

const mysql=require("mysql");  //creating  object for database

var db = mysql.createConnection({

    
    
      //WITH ENV  
    
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASS,
        database:process.env.DATABASE,
    
      });
    


exports.register=(req,res)=>
{
    // res.send("form submitted")
    console.log(req.body)
}

app.js

{
    console.log("sql connected")
}
})


app.use(express.urlencoded({extended:false}));  //for getting input from post method with req.body


step 11 getting data  in checking some validations



controller/users.js

const mysql=require("mysql");  //creating  object for database

var db = mysql.createConnection({

    
    
      //WITH ENV  
    
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASS,
        database:process.env.DATABASE,
    
      });
    


exports.register=(req,res)=>
{
    // res.send("form submitted")
    console.log(req.body)

    const employee=req.body.employee;
    const email=req.body.email;
    const password=req.body.password;
    const cnfm_password=req.body.cnfm_password;

    //alternative way to get a individual values
    // const {name,email,password,cnfm_password}=req.body

    // console.log(employee)
    // console.log(email)
    // console.log(password)
    // console.log(cnfm_password)

//here we checking the getting data are available in bd or not for before inserting
//? is used to prevent sql enjection 

    db.query(
        "select email_id from users where email_id=?",[email],
        (error,result)=> {

            if(error)
            {
                confirm.log(error);
            }

            if(result.length>0)
            {

                return res.render('register',{msg:'Email id already exits'})
            }
            else if(password!==cnfm_password)
            {
                return res.render('register',{msg:'password missmatch'})

            }

        }
    )

}

step 12 

controller/users.js

after validation
inserting the data to user table



            let  hashedpassword= await bcrypt.hash(password,8);  //converting the hash password
            console.log('hashedpassword',hashedpassword)  //hashedpassword $2a$08$8wLTUVEsESSKu3G7nlGwI.8d/D5Auz8RpviTAdVohX24TCQH0e0Ti


            //inserting the values to user table 
            db.query("insert into users set ?",{employee_id:employee,email_id:email,password:password,confirm_password:hashedpassword},(error,result)=>{
                if(error){
                    console.log(error);
                }
                else{
                    console.log(result);
                    return res.render('register',{msg:'Registration success',msg_type:"good"})
                }
            
            })

 step 13

            login 

user.js

//controller for login system

exports.login=async (req,res)=>
{
try {
// const {email ,password}=req.body;
const email=req.body.email;
const password=req.body.password;
console.log('emails',email)
if(!email || !password)
{
    return res.status(400).render("heropage",{msg:"Please enter your email and password",msg_type :"error"})
}

//authendicatinf the user name  and password
db.query("select * from users where email_id=?",[email],async (error,result)=>{
    console.log(result)
    if(result<=0){

        return res.status(401).render("login",{
            msg: "please enter your email and password",
            msg_type:"error",});
    }
    else{
        if(!(await bcrypt.compare(password,result[0].confirm_password)))

        {
          
            
            return res.status(401).render("login",{
                msg: "please enter your email and password",
                msg_type:"error",});

        }

        else
        {
            res.send("good")
        }
    }
})

}
catch(error)
{
    console.log(error)
}

};

14 ,

store the cookie while user login



.evn
//JWT (json web token) GENERATION
JWT_SECRET =1234
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES= 90

user.js

const jwt=require('jsonwebtoken')  //i
//login controller

exports.login=async (req,res)=>
{
try {
// const {email ,password}=req.body;
const email=req.body.email;
const password=req.body.password;
console.log('emails',email)
if(!email || !password)
{
    return res.status(400).render("heropage",{msg:"Please enter your email and password",msg_type :"error"})
}

//authendicatinf the user name  and password
db.query("select * from users where email_id=?",[email],async (error,result)=>{
    console.log(result)
    if(result<=0){

        return res.status(401).render("login",{
            msg: "please enter your email and password",
            msg_type:"error",});
    }
    else{
        if(!(await bcrypt.compare(password,result[0].confirm_password)))

        {
          
            
            return res.status(401).render("login",{
                msg: "please enter your email and password",
                msg_type:"error",});

        }

        else
        {
            // res.send("good")
            const id=result[0].id; //getting the responce data ,like id from user table
            //generting the token  for session setup
             const token =jwt.sign({id :id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN,});
             //use the cookies to expire date for the  user name and password
            const  cookies={

            expires:new Date(
                Date.now()+process.env.JWT_COOKIE_EXPIRES *24*60*60*1000//h-m-s-mil
            ) ,
            httpOnly:true, //only works in http

            }  ;
              //store the cookie by responce //reflect in console->application->sessions->cookie
            res.cookie("cook",token,cookies);

            // http 200 means responce is perfect
            res.status(200).redirect("/home");



console.log('the token',token)

        }
    }
})

}
catch(error)
{
    console.log(error)
}

};