import express from "express";
import { getUser } from "../controllers/user.controller.js";



const usersRoute = express.Router();

// get user
usersRoute.get("/me", getUser);


export default usersRoute;
