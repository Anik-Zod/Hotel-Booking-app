import express from "express";
import {  deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();



// Update 
router.put("/:id",verifyUser, updateUser);

// Delete 
router.delete("/:id",verifyUser,deleteUser);

// get All
router.get("/",verifyAdmin, getUsers);

// get Specific
router.get("/:id",verifyUser,getUser);

export default router;
