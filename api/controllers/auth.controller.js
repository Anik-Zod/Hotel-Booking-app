import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
      isAdmin: req.body.isAdmin === true,
    });
    await newUser.save();
    res.status(201).json("User has been created");
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) return res.json({ message: "email required" });

    const user = await User.findOne({ email:email });
    if (!user) {
      return next(createError(404, "User not found")); // Stop here if no user is found
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Wrong credentials")); // Stop here if password is incorrect
    }

    // After this point, the user is authenticated, so create the token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    // Send the token as a cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    return next(error);
  }
};
