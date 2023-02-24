import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogByKeyword,
  getBlogByUsername,
  updateBlog,
} from "../controller/blogControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.route("/create").post(protect, createBlog);
Router.route("/").get(getAllBlogs);
Router.route("/myblogs").get(protect, getBlogByUsername);
Router.route("/search").get(getBlogByKeyword);
Router.route("/blog/:id").get(getBlogById);
Router.route("/update/:id").put(protect, updateBlog);
Router.route("/delete/:id").delete(protect, deleteBlog);

export default Router;
