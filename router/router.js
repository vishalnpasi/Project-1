const express = require('express')
const router = express.Router()


router.get('/getApi',function(req,res){
    console.log("program successfully executed")
    res.status(200).send({msg:"program successfully executed"})
})
router.post('/createData',function(req,res){
    let data = req.body
    console.log(data)
    res.send({msg:"hello data created"})
})

module.exports =router