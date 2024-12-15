const express = require("express");
const path = require('path')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')

const app = express();

const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogApp').then(e=> console.log("mongodb connected"))   //connecting mongodb

const userRouter = require("./routes/user");
const checkForAuthenticationCookie = require("./middleware/auth");

app.set('view engine', 'ejs')   //setting up view engine
app.set('views', path.resolve("./views"))  //setting up views

app.use(express.urlencoded({extended: false}))
app.use(cookieparser())
app.use(checkForAuthenticationCookie('token'))

app.get('/', (req, res)=>{
    res.render("home" , {
        user: req.user
    })

})

app.use('/users', userRouter) // using user router

app.listen(PORT, ()=> {console.log(`server started at ${PORT}`)});



