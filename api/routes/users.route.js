import express from "express";
import { listUsers } from "../controllers/user.controller.js";




const usersRoute = express.Router();

// get user
usersRoute.get("/list", listUsers);


export default usersRoute;
