const { Schema, model, Error } = require("mongoose")


const commentSchema = new Schema({
     content:{
        type: String,
        required: true
     },
     createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    blogID: {
        type: Schema.Types.ObjectId,
        ref: 'blog'
    },
},{timestamps: true})


const comment = model("comment", commentSchema)


module.exports = comment