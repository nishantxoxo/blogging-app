const {Router} = require("express")
const multer = require('multer')
const path = require('path')
const Blog = require('../models/blog')
const Comment = require("../models/comment")




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename)
    }
  })

const upload = multer({storage: storage})


const router = Router();


router.get('/add-new', (req, res)=>{
    return res.render('addblog', {
        user: req.user
    })
})


router.get('/:id', async (req, res)=> {
    const id = req.params.id
    const blog = await Blog.findById(id).populate("createdBy")
    const comments = await Comment.find({ blogID: req.params.id}).populate("createdBy")

    console.log("comments--- ", comments)

    res.render('blog', 
        {
        user: req.user,
        blog: blog,
        comment: comments
        }

    )
} )

router.post('/', upload.single('coverImage') , async (req, res)=>{
 
    const { title, body } = req.body
    const blog = await Blog.create({
        body: body,
        title: title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`    
    })
    return res.redirect(`/blog/${blog._id}`)
})

router.post('/comment/:blogID', async (req, res)=>{
   await Comment.create({
        content: req.body.content,

        blogID: req.params.blogID,
        createdBy: req.user._id 

    })
    return res.redirect(`/blog/${req.params.blogID}`)
})


module.exports = router
