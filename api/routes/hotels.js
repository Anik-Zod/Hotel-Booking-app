import express from "express";
import { countByType,countByCity,createHotel, deleteHotel, getHotel, getHotels, updateHotel, getHotelRooms, featured, expensive } from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create route
router.post("/",verifyAdmin, createHotel);

// Update route
router.put("/:id",verifyAdmin, updateHotel);

// Delete route
router.delete("/:id",verifyAdmin, deleteHotel);

// get All
router.get("/", getHotels);

// get Specific
router.get("/find/:id",getHotel);

router.get("/countByCity",countByCity);

router.get("/countByType",countByType);

router.get('/rooms/:id',getHotelRooms)

router.get('/featured',featured)
router.get('/expensive',expensive)


export default router;
