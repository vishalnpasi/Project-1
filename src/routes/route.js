const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorController')
const blogsController = require('../controllers/blogsController')

const authMiddleware = require('../middleware/authMiddleware')

// post /authors .....create Authors...
router.post('/authors',authorsController.createAuthor) 

router.post('/login',authorsController.loginAuthor)

//1) post /blogs.....create Block...

router.post('/blogs',authMiddleware.authication, blogsController.createBlogs)

//2)  get block
router.get('/blogs',authMiddleware.authication,blogsController.getBlogs) 

//3)put ) updateBlogs...
router.put('/blogs/:blogId',authMiddleware.authication , authMiddleware.authorisation,blogsController.updateBlogs)
//4) delete ) delete blogs By Id..
router.delete('/blogs/:blogId',authMiddleware.authication,authMiddleware.authorisation, blogsController.deleteBlogsById)

//5) delete ) delete blogs By filter..
router.delete('/blogs',authMiddleware.authication,authMiddleware.deleteAuthorisation, blogsController.deleteBlogsByFilter)
module.exports = router;






















// router.put('/blogs/:blogId',blogsController.updateBlogs) 

// router.delete('/blogs/:blogId',blogsController.deleteBlogsById) 

// router.delete('/blogs',blogsController.deleteBlogsByQuery)      
