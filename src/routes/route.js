const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsController')
const blogsController = require('../controllers/blogsController')

router.post('/authors',authorsController.createAuthor)  // aniket..

router.get('/blogs',blogsController.getBlogs)       // dipanshu

router.put('/blogs/:blogId',blogsController.updateBlogs)    // jay sharma..

router.delete('/blogs/:blogId',blogsController.deleteBlogsById) //vishal..

router.delete('/blog',blogsController.deleteBlogs)      // vishal...

module.exports = router;