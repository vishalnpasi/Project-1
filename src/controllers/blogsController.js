const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const mongoose = require('mongoose')

// 1) post ) createBlogs...
const createBlogs = async function (req, res) {
    try {

        let authorId = req.body.authorId
        let blogData = req.body
         
        if (! mongoose.Types.ObjectId.isValid(authorId)) return res.status(400).send({ status: false, msg: "AuthorId is not Valid" })

        let result = await authorModel.findById(authorId)
        if (!result) return res.status(404).send({ status: false, msg: "Author is not Present" })

        let title = req.body.title
        if (!title) return res.status(400).send({ status: false, msg: "title is a mandatory thing" })

        let body = req.body.body
        if (!body) return res.status(400).send({ status: false, msg: "body is a mandatory thing" })

        if(!req.body.category) return res.status(400).send({ status: false, msg: "category is a mandatory thing" })

        if (blogData.isPublished === true && !blogData.publishedAt) 
            return res.status(400).send({ status: false, msg: "published  date is a mandatory thing" })

        let savedData = await blogModel.create(blogData)

        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}
//2) get ) getBlogs...
const getBlogs = async function (req, res) {

    try {

        let findData = req.query;
        let result = await blogModel.find({$and :[findData,{isDeleted:false,isPublished:true}]});
        if (result.length == 0) return res.status(404).send({ status: false, msg: "DATA NOT FOUND" })
        res.status(200).send({ status: true, data: result })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
// 3) put) update blogs...
const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if(!mongoose.Types.ObjectId.isValid(blogId))
            return res.status(400).send({ status: false, msg: "blogId is invilid" })

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "No data for update" })
        
        let data = await blogModel.findById(blogId)
        if (data.isDeleted === true) return res.status(404).send({ status: false, msg: "data not found" })

        let blogData = { }
        if(req.body.title) blogData.title=req.body.title

        if(req.body.body)  blogData.body=req.body.body

        blogData.isPublished = true;
        blogData.publishedAt = Date.now()

        let blogTags ={}
        if(req.body.tags) blogTags.tags = req.body.tags

        if(req.body.subcategory) blogTags.subcategory=req.body.subcategory

        let saveddata = await blogModel.findOneAndUpdate({ id: blogId }, { $set:blogData , $addToSet:blogTags }, { new: true })
        res.status(200).send({ status: true, data: saveddata })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

// 4) delete ) delete blogs by blogId...
const deleteBlogsById = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if (!mongoose.Types.ObjectId.isValid(blogId))
            return res.status(400).send({ status: false, msg: "blogId Is invilid" })

        let blogData = await blogModel.findById(blogId)
        if (!blogData) return res.status(404).send({ status: false, msg: "Data Not Found" })

        if (blogData.isDeleted === true)
            return res.status(404).send({ status: false, msg: "DATA NOT FOUND" })
        let result = await blogModel.findOneAndUpdate({ id: blogId }, { isDeleted: true }, { new: true })
        res.status(200).send()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "server side error" })
    }

}

//5) delete ) delete blogs by Fileter
const deleteBlogsByFilter = async function (req, res) {

    try {
        if (Object.keys(req.query).length==0)
           return  res.status(400).send({ status: false, msg: "Pls give some filter" })

        let queryData = req.query
        let blogData = await blogModel.updateMany({ $and: [queryData, { isPublished: false }] }, { $set: { isDeleted: true } })
        if (blogData.modifiedCount == 0)
            res.status(404).send({ status: false, msg: "DATA NOT FOUND" })

        res.status(200).send({ status: true, data: blogData })
    }
    catch (err) {

    }

}


module.exports = { createBlogs, getBlogs, updateBlogs, deleteBlogsById, deleteBlogsByFilter }