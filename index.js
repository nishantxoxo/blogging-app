const express = require("express");
const path = require('path')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')

const Blog = require('./models/blog')

const app = express();

const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogApp').then(e=> console.log("mongodb connected"))   //connecting mongodb

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const checkForAuthenticationCookie = require("./middleware/auth");

app.set('view engine', 'ejs')   //setting up view engine
app.set('views', path.resolve("./views"))  //setting up views

app.use(express.urlencoded({extended: false}))
app.use(cookieparser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))


app.get('/', async (req, res)=>{
    const allBlogs = await Blog.find({})
    res.render("home" , {
        user: req.user,
        blogs: allBlogs 
    })

})


app.use('/users', userRouter)
app.use('/blog', blogRouter) // using user router
 // using user router

app.listen(PORT, ()=> {console.log(`server started at ${PORT}`)});



