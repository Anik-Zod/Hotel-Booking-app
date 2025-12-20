import express from "express";
import { countByType,countByCity,createHotel, deleteHotel, getHotel, getHotels, updateHotel, getHotelRooms, featured, expensive } from "../controllers/hotel.controller.js";


const hotelsRoute = express.Router();

// Create route
hotelsRoute.post("/", createHotel);

// Update route
hotelsRoute.put("/:id", updateHotel);

// Delete route
hotelsRoute.delete("/:id", deleteHotel);

// get All
hotelsRoute.get("/", getHotels);

// get Specific
hotelsRoute.get("/find/:id",getHotel);

hotelsRoute.get("/countByCity",countByCity);

hotelsRoute.get("/countByType",countByType);

hotelsRoute.get('/rooms/:id',getHotelRooms)

hotelsRoute.get('/featured',featured)
hotelsRoute.get('/expensive',expensive)


export default hotelsRoute;
