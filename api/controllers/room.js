import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const { hotelId } = req.params;
    const newRoom = new Room(req.body);
  
    try {
      const savedRoom = await newRoom.save();
      const hotel = await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
      if (!hotel) {
        return next(createError(404, "Hotel not found"));
      }
      res.status(201).json(savedRoom);
    } catch (error) {
      next(createError(500, "Failed to create room"));
    }
};


export const updateRoom = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const result = await Room.findByIdAndUpdate(id, updatedData, { new: true });
        if (!result) {
          return next(createError(404, "Room not found"));
        }
        res.status(200).json(result);
    } catch (error) {
        next(createError(500, "Failed to update room"));
    }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id }, // Removed extra space
      { $push: { "roomNumbers.$.unavailableDate": req.body.dates  } }
    );
    res.status(200).json({ message: "Room availability updated successfully" });
  } catch (error) {
    next(error);
  }
};


export const deleteRoom = async (req, res, next) => {
  const { id } = req.params;  // Room ID from request parameters
  const { hotelId } = req.params;  // Hotel ID from request parametes 

  try {
    // Find and delete the room by its ID
    const deletedRoom = await Room.findByIdAndDelete(id);
    
    if (!deletedRoom) {
      // Return error if room was not found
      return res.status(404).json("Room not found");
    }

    // Remove the deleted room from the hotel’s room list
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } });

    // Respond with success message and the deleted room data
    res.status(200).json({ message: "Room deleted successfully", data: deletedRoom });
  } catch (error) {
    // Pass error to the error handler middleware
    next(error);
  }
};


export const getRooms = async (req, res, next) => {
    try {
        const result = await Room.find();
        if (result.length === 0) {
            return next(createError(404, "No rooms found"));
        }
        res.status(200).json(result);
    } catch (error) {
        next(createError(500, "Failed to fetch rooms"));
    }
};

export const getRoom = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await Room.findById(id);
        if (!result) {
            return next(createError(404, "Room not found"));
        }
        res.status(200).json(result);
    } catch (error) {
        next(createError(500, "Failed to fetch room"));
    }
};
