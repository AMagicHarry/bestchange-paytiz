const Blog = require('../models/Blog');

exports.addBlog = async (req, res, next) => {
  const { title, user, content } = req.body;
  if (!title || !user || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    next({ message: 'Internal server error', error: error.message });
  }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    next({ message: 'Internal server error' });
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      next({ message: 'Internal server error' });
    }
    res.status(200).json(blog);
  } catch (error) {
    next({ message: 'Internal server error' });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) {
      next({ message: 'Internal server error' });
    }
    res.status(200).json(blog);
  } catch (error) {
    next({ message: 'Internal server error' });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      next({ message: 'Internal server error' });
    }
    res.status(200).json(blog);
  } catch (error) {
    next({ message: 'Internal server error' });
  }
};
