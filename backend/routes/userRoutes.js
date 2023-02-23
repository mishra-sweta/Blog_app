import express from "express";
import { login, registerUser } from "../controller/userControllers.js";

const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(login);

export default Router;
