const {Router} = require("express")
const User = require("../models/user")
const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin")
});



router.get('/signup', (req, res) => {
    return res.render("signup")
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

