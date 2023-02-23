import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";

/**
 * Desc : Creating a new blog
 * Method : POST
 * NOTE:
 */

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.body.title });
    if (blog) {
      res.status(400).json({
        message: "A blog with same title exists",
      });
    }
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      username: req.body.username,
    });
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * Desc : Fetching all blogs
 * Method : GET
 * NOTE:
 */

export const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    let blogs = await Blog.find({}).sort({ createdOn: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * Desc : Fetching blog by title
 * Method : GET
 * NOTE:
 */

export const getBlogByTitle = asyncHandler(async (req, res) => {
  try {
    let blog = await Blog.findOne({ title: req.params.title });

    if (!blog) {
      res.status(400).json({
        message: "No blog with such title",
      });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
