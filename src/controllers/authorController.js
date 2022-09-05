const authorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
    try {

        let data = req.body;
        let author = await authorModel.create(data)
        return res.status(200).send({ status: true, message: author })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const getAuthorsData = async function (req, res) {
    let authors = await authorModel.find()
    return res.send({ data: authors })

}

module.exports = { createAuthor, getAuthorsData };