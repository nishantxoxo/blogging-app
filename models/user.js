const { Schema } = require("mongoose")

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
        reuqired: true,

        
    }
})