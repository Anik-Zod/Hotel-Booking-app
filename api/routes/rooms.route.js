import express from "express";
import {
    createRoom,
    deleteRoom,
    updateRoomAvailability,
    getRoom,
    getRooms,
    updateRoom
} from "../controllers/room.controller.js";



const roomsRoute = express.Router();

// Create 
roomsRoute.post("/:hotelId", createRoom);

roomsRoute.put("/availability", updateRoomAvailability);

// Update 
roomsRoute.put("/:id", updateRoom);


// Delete 
roomsRoute.delete("/:id/:hotelId", deleteRoom);

// Get all 
roomsRoute.get("/", getRooms);

// Get a specific 
roomsRoute.get("/:id", getRoom);

export default roomsRoute;
