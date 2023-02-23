import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogByTitle,
} from "../controller/blogControllers.js";

const Router = express.Router();

Router.route("/create").post(createBlog);
Router.route("/blogs").get(getAllBlogs);
Router.route("/blogs/:title").get(getBlogByTitle);

export default Router;
