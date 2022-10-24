//initialize the express js
const express=require('express');
const mysql=require("mysql");  //creating  object for database
const doenv=require ("dotenv")  //declaring the env
const path =require('path') //use this npm default package for maintaing the folder structure
const app=express(); //creating object for express js 
const hbs=require("hbs") //initialize to use the hbs (handle bars)
const cookieparser=require("cookie-parser") //  //initialize to use the parser for verify the cookie after alloe to login the user



//configuring env (used to password and db security)

doenv.config({
    path:"./.env",
})


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



//   checking connection or verifying  connection

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


//

app.use(cookieparser());

 

app.use(express.urlencoded({extended:false}));  //for getting input from post method with req.body



console.log(__dirname); //shows the cufrrent directory name by using the path pkg

const location =path.join(__dirname,"./public");  //join function used to join the 2 paths   
app.use(express.static(location)); // here we giving permission to use this folders as here freedomly,we can get any photos files from this path
app.set("view engine","hbs") //here i am telling use the view engine for view templates from hbs

const partialpath =path.join(__dirname,"./views/partials");  //join the current path and views partialpath together
hbs.registerPartials(partialpath) 

app.use('/',require("./routes/pages"));//passing the routes from here to rotes/pages
app.use('/auth',require("./routes/auth"))//passing the routes from here to rotes/auth



// //initial landing page
// app.get("/",(req,res)=>
// {

//     res.render("heropage");
// })

// //route for render the register page
// app.get("/register",(req,res)=>
// {

//     res.render("register");
// })

// //route for dashboard 
// app.get("/dash",(req,res)=>
// {
//     res.render("dashboard")
// })


// //route for home
// app.get("/home",(req,res)=>
// {
//     res.render("home")
// })


app.listen(5000,()=>{  //listening live sever @ this port

    console.log("server started @ 6000 port");

    //and in package.json declare in the script tag 
    // "scripts": {

    //     "test": "echo \"Error: no test specified\" && exit 1",
    //     "start":"nodemon app.js"
    //   },

    // to start the server -npm start dev
});

