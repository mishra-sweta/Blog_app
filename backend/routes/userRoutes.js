import express from "express";
import { registerUser } from "../controller/userControllers.js";

const Router = express.Router();

Router.route("/register").post(registerUser);

export default Router;
