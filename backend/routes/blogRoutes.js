import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogByKeyword,
  getBlogByUsername,
} from "../controller/blogControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.route("/create").post(protect, createBlog);
Router.route("/").get(getAllBlogs);
Router.route("/myblogs").get(protect, getBlogByUsername);
Router.route("/search").get(getBlogByKeyword);

export default Router;
