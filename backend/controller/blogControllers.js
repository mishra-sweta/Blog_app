import Blog from "../models/blogModels.js";
import asyncHandler from "express-async-handler";

/**
 * Desc : Creating a new blog
 * Method : POST
 * NOTE:
 */

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      username: req.user.username,
    });
    res.status(200).json(newBlog);
  } catch (error) {
    console.log(error);
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
    let blogs = await Blog.find({}).sort({ _id: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * Desc : Fetching blog by username
 * Method : GET
 * NOTE:
 */

export const getBlogByUsername = asyncHandler(async (req, res) => {
  try {
    let blog = await Blog.find({ username: req.user.username });

    if (!blog) {
      res.status(404).json({
        message: "No blogs found",
      });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * Desc : Fetching blog by keyword
 * Method : GET
 * NOTE:
 */

export const getBlogByKeyword = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const blogs = await Blog.find().sort({ _id: -1 });
    const temp = blogs.filter((e) => {
      const title = e.title.toLowerCase();
      if (title.includes(keyword.toLowerCase())) {
        return e;
      }
    });
    const Response = await Promise.all(temp);
    res.status(200).json(Response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
