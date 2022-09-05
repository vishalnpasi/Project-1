const blogModel = require('../models/blogModel')

const deleteBlogsById = async function(req, res){
    try{
        let blogId = req.body.blogId
        let result = await blogModel.findOneAndUpadate({id:blogId},{isDaleted:true})
        if(!result) return res.status(404).send({status:false,msg:"#error-response-structure"})
        res.status(200)

    }catch(err){
        res.status(500).send({status:false,msg:"server Side Error"})
    }
}

const deleteBlogsByQuery = async function(req, res){
    try{
        let specificData = req.query
        let result = await blogModel.updateMany(specificData,{isDaleted:true})
        if(!result) return res.status(404).send({status:false,msg:"#error-response-structure"})
        res.status(200)

    }catch(err){
        res.status(500).send({status:false,msg:"server Side Error"})
    }
}

module.exports = { deleteBlogsById ,deleteBlogsByQuery }