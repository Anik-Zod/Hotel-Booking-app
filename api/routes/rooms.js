import express from "express";
import {
    createRoom,
    deleteRoom,
    updateRoomAvailability,
    getRoom,
    getRooms,
    updateRoom
} from "../controllers/room.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create 
router.post("/:hotelId", verifyAdmin, createRoom);

// Update 
router.put("/:id", verifyAdmin, updateRoom);

router.put("/availability/:id", updateRoomAvailability);

// Delete 
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// Get all 
router.get("/", getRooms);

// Get a specific 
router.get("/:id", getRoom);

export default router;
