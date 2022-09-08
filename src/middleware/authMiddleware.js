const blogModel = require('../models/blogModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ status: false, msg: "Token is not Present", })
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, "importent key")
        }
        catch (err) {
            return res.status(401).send({ status: false, msg: "Token is Invilid" })
        }
        req['x-api-key'] = decodedToken
        next();

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const authorisation = async function (req, res, next) {
    try {

        let blogId = req.params.blogId
        if (! mongoose.Types.ObjectId.isValid(blogId)) return res.status(400).send({ status: false, msg: "blogId is not Valid" })

        let Data = await blogModel.findById(blogId)
        if (!Data) return res.status(404).send({ status: false, msg: "data not found" })

        if(req['x-api-key'].id != Data.authorId) return res.status(403).send({ status: false, msg: "authorisation failed" })
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const deleteAuthorisation = async function (req, res, next) {
    try {

        if(Object.keys(yreq.quer).length ==0) 
            return res.status(400).send({status:false,msg:"PLS give some filter"})
        
        let data = req.query
        if(data.authorId){
            if (! mongoose.Types.ObjectId.isValid(data.authorId)) 
                return res.status(400).send({status:false,msg:"authorId is invilid"})

            if(req['x-api-key'].id != data.authorId)
                return res.status(403).send({status:false,msg:"token is invilid"})
            next()
        }
        let blogData = await blogModel.find({$and :[data,{authorId:req['x-api-key'].id}]})
        if(blogData.length==0)
            return res.status(404).send({status:false,msg:"DATA NOT FOUND"})
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = { authication, authorisation ,deleteAuthorisation}
