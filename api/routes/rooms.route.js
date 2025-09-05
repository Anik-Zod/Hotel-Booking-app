import express from "express";
import {
    createRoom,
    deleteRoom,
    updateRoomAvailability,
    getRoom,
    getRooms,
    updateRoom
} from "../controllers/room.controller.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const roomsRoute = express.Router();

// Create 
roomsRoute.post("/:hotelId", verifyAdmin, createRoom);

// Update 
roomsRoute.put("/:id", verifyAdmin, updateRoom);

roomsRoute.put("/availability/:id", updateRoomAvailability);

// Delete 
roomsRoute.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// Get all 
roomsRoute.get("/", getRooms);

// Get a specific 
roomsRoute.get("/:id", getRoom);

export default roomsRoute;
