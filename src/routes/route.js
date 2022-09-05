const express = require('express');
const router = express.Router();
const authersController = require('../controllers/authersController')

router.post('/authors',authorsController.createAuthor)

router.get('/blogs',blogsController.getBlogs)

router.put('/blogs/:blogId',blogsController.updateBlogs)

module.exports = router;