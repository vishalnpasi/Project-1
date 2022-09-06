const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const mongoose = require('mongoose')

// 1) post ) createBlogs...
const createBlogs = async function (req, res) {
    try {

        let authorId = req.body.authorId
        let blogData = req.body

        if (!authorId) return res.status(400).send({ status: false, msg: "AuthorId is not Present" })

        let isValid = mongoose.Types.ObjectId.isValid(authorId);
        if (isValid === false) return res.status(400).send({ status: false, msg: "AuthorId is not Valid" })

        let result = await authorModel.findById(authorId)
        if (!result) return res.status(404).send({ status: false, msg: "Author is not Present" })

        let title = req.body.title
        if (!title) return res.status(400).send({ status: false, msg: "title is a mandatory thing" })

        let body = req.body.body
        if (!body) return res.status(400).send({ status: false, msg: "body is a mandatory thing" })

        if (blogData.isPublished === true && !blogData.publishedAt) {
            return res.status(400).send({ status: false, msg: "published  date is a mandatory thing" })
        }

        let savedData = await blogModel.create(blogData)
        console.log(savedData)
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
        let result = await blogModel.find(findData);
        if (result.length == 0) return res.status(400).send({ status: false, msg: "NOT FOUND" })
        res.status(200).send({ status: true, data: result })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
// 3) put) update blogs...
const updateBlogs = async function (req, res) {
    try {
        let blogData = req.body
        let blogId = req.params.blogId;
        if (!blogId) return res.status(400).send({ status: false, msg: "blogid not present" })
        if(!mongoose.Types.ObjectId.isValid(blogId))
            return res.status(400).send({ status: false, msg: "blogId is invilid" })
        if (Object.keys(blogData).length == 0) return res.status(400).send({ status: false, msg: "No data for update" })

        let saveddata = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: blogData }, { new: true })
        res.status(201).send({ status: true, data: saveddata })
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
            return res.status(400).send({ status: false, msg: "blog is Already Deleted" })
        let result = await blogModel.findOneAndUpdate({ id: blogId }, { isDeleted: true }, { new: true })
        res.status(200)//.send({status:true,data:blogData})
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "server side error" })
    }

}

//5) delete ) delete blogs by Fileter
const deleteBlogsByFilter = async function (req, res) {

    try {
        if (!req.query.authorId && !req.query.category && !req.query.tags && !req.query.subcategory)
            res.status(400).send({ status: false, msg: "Pls give some filter" })

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