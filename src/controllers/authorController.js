const authorModel = require("../models/authorModel")
const jwt = require('jsonwebtoken')

let regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
let regpass = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#&$%?]).*$/
let regname = /^[a-zA-Z]+([_ -]?[a-zA-Z])*$/

const createAuthor = async function (req, res) {

    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "data is not given" })

        let fname = data.fname
        if (!fname) return res.status(400).send({ status: false, msg: "fname is a  mandatory " })

        if (!regname.test(fname)) return res.status(400).send({ status: false, msg: "pls write fname in correct format" })

        let lname = data.lname
        if (!lname) return res.status(400).send({ status: false, msg: "lname is a  mandatory " })
        if (!regname.test(lname)) return res.status(400).send({ status: false, msg: "pls write lname in correct format" })


        if (!data.title) return res.status(400).send({ status: false, msg: "title is a  mandatory thing" })
        if (!['Mr', 'Mrs', 'Miss'].find(element => element == data.title)) return res.status(400).send({ status: false, msg: "Title Name is NOT Present" })

        if (!data.email) return res.status(400).send({ status: false, msg: "email is not Present" })
        if (!regex.test(data.email)) return res.status(400).send({ status: false, msg: "email is not valid" })

        let uemail = await authorModel.findOne({ email: data.email })
        if (uemail) return res.status(400).send({ status: false, msg: "this email is already present" })

        if (!data.password) return res.status(400).send({ status: false, msg: "Password is Mendatory" })

        if (!regpass.test(data.password)) return res.status(400).send({ status: false, msg: "password must contain 8 letters one uppercase,one lowercase,one number " })

        let author = await authorModel.create(data)
        return res.status(201).send({ status: true, data: author })

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const loginAuthor = async function (req, res) {
    try {
        let email = req.body.email
        if (!email) return res.status(400).send({ status: false, msg: "Email is Mendatory" })

        let password = req.body.password
        if (!password) return res.status(400).send({ status: false, msg: "Password is Mendatory" })

        let authorData = await authorModel.findOne({ email: email, password: password })

        if(!authorData)   return res.status(404).send({ status: false, msg: "DATA NOT FOUND" })
        
        let token = jwt.sign({id:authorData._id },"importent key")

        res.status(201).send({status:true,data:{token:token}})
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = { createAuthor, loginAuthor };


const a = require("../models/authorModel")