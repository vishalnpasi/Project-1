const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Author",
        required:true
    },
    tags:[String],
    category:{
        type:[String],
        required:true
    },
    subcategory:[String],
    deletedAt:Date,
    isDeleted:{
        type:Boolean,
        default:false
    },
    publishedAt:Date,   // give that format "YYYY-MM-DD"
    isPublished: {
        type:Boolean,
        default:false
    },
},{timestamps:true})

module.exports = mongoose.model('blog',blogSchema)