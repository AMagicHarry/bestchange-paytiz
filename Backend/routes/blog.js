const router = require('express').Router();
const { getBlogs, getBlog, deleteBlog, updateBlog, addBlog, getRecentBlogs } = require('../controllers/blog.js');


// Include the middleware for authentication if needed (commented out for now)
// const { protect } = require('../middleware/protect.js');
// router.use(protect);

// Routes for /blogs
router.route('/')
    .get(getBlogs)
    .post(addBlog);

// Route for recent blogs
router.get('/recent', getRecentBlogs);

// Routes for /blogs/:id
router.route('/:id')
    .get(getBlog)
    .delete(deleteBlog)
    .put(updateBlog);

module.exports = router;
