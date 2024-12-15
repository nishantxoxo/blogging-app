const {Router} = require("express")
const User = require("../models/user")
const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin")
});

router.get('/signup', (req, res) => {
    return res.render("signup")
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password)
        // console.log('the token is ', token)
        return res.cookie('token', token).redirect('/')
        
    }catch(e){                                           //caught an error thrown from the mongoose fucntion used above
        return res.render('signin', {
            error: "incorrect email or password"
        })
    }

});

router.post('/signup', async (req, res)=> {

    const {name, email, password} = req.body 

    await User.create({
        name: name,
        email: email,
        password: password,
    })
    return res.redirect("/")
})


router.get('/logout', (req, res)=>{
    res.clearCookie('token').redirect('/')
})

module.exports = router

