import express from "express";
import {  deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const usersRoute = express.Router();



// Update 
usersRoute.put("/:id",verifyUser, updateUser);

// Delete 
usersRoute.delete("/:id",verifyUser,deleteUser);

// get All
usersRoute.get("/",verifyAdmin, getUsers);

// get Specific
usersRoute.get("/:id",verifyUser,getUser);

export default usersRoute;
