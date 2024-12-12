const express = require("express");
const path = require('path')
const app = express();

const PORT = 8000;


app.set('view engine', 'ejs')   //setting up view engine
app.set('views', path.resolve("./views"))  //setting up views

app.get('/', (req, res)=>{
    res.render("home")
})

app.listen(PORT, ()=> {console.log(`server started at ${PORT}`)});



