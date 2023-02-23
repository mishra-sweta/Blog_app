import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

/**
 * Desc : Adding new user
 * Method : POST
 * NOTE:
 */

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
