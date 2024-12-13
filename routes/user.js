const {Router} = require("express")
const User = require("../models/user")
const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin")
});

router.get('/signup', (req, res) => {
    return res.render("signup")
});

router.post('/signin', (req, res) => {
    const {email, password} = req.body
    const user =  User.matchPassword(email, password)
    console.log(user)
    return res.redirect('/')
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

module.exports = router

