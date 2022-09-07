const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorController')
const blogsController = require('../controllers/blogsController')

// post /authors .....create Authors...
router.post('/authors',authorsController.createAuthor) 
//1) post /blogs.....create Block...
router.post('/blogs',blogsController.createBlogs)

//2)  get block
router.get('/blogs',blogsController.getBlogs) 

//3)put ) updateBlogs...
router.put('/blogs/:blogId',blogsController.updateBlogs)
//4) delete ) delete blogs By Id..
router.delete('/blogs/:blogId',blogsController.deleteBlogsById)

//5) delete ) delete blogs By filter..
router.delete('/blogs',blogsController.deleteBlogsByFilter)
module.exports = router;






















// router.put('/blogs/:blogId',blogsController.updateBlogs) 

// router.delete('/blogs/:blogId',blogsController.deleteBlogsById) 

// router.delete('/blogs',blogsController.deleteBlogsByQuery)      
