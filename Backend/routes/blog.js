const router = require('express').Router();
const { getBlogs, getBlog, deleteBlog, updateBlog, addBlog } = require('../controllers/blog.js');
// const { protect } = require('../middleware/protect.js');

// router.use(protect);

router.route('/')
    .get(getBlogs)
    .post(addBlog);

router.route('/:id')
    .get(getBlog)   
    .delete(deleteBlog)
    .put(updateBlog);  

module.exports = router;
