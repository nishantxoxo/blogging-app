const { Schema, model } = require("mongoose")
const {createHmac, randomBytes} = require("node:crypto")
const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    salt: { 
        type: String,

        required: true
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"]
    }, 

    profileImageURL:{
        type: String,
        default: "/images/default.png"
    }
},{timestamps: true})


userSchema.pre("save", function (next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString   //creating salt for each user
    const hashedpass = createHmac('sha256', salt).update(user.password).digest("hex")  

    this.salt = salt
    this.password = hashedpass

    next();
})

const User = model('user', userSchema)

module.exports = User