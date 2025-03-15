import User from "../models/User.js";
import { createError } from "../utils/error.js";


export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
      const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });
      if (!result) return next(createError(404,"User not found"))
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
}



export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) return next(createError(404,"User not found"))
      res.status(200).json({ message: "User deleted successfully", data: result });
    } catch (error) {
      next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0)  return next(createError(404,"No user found"))
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
}

export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return next(createError(404,"User not found"))
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
}