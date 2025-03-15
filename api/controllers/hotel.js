import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import Room from "../models/Room.js"
export const createHotel = async (req, res, next) => {
  const newData = new Hotel(req.body);
  try {
    await newData.save();
    res.status(200).json(newData);
  } catch (error) {
    next(createError(500, "Failed to create hotel"));
  }
};

export const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const result = await Hotel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!result) {
      return next(createError(404, "Hotel not found"));
    }
    res.status(200).json(result);
  } catch (error) {
    next(createError(500, "Failed to update hotel"));
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Hotel.findByIdAndDelete(id);
    if (!result) {
      return next(createError(404, "Hotel not found"));
    }
    res
      .status(200)
      .json({ message: "Hotel deleted successfully", data: result });
  } catch (error) {
    next(createError(500, "Failed to delete hotel"));
  }
};

export const getHotels = async (req, res, next) => {
  const { min = 1, max = 999, limit=30, ...others } = req.query;
  try {
    const result = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: Number(min), $lt: Number(max) },
    }).limit(Number(limit));

    if (result.length === 0) {
      return next(createError(404, "No hotels found"));
    }
    res.status(200).json(result);
  } catch (error) {
    next(createError(500, "Failed to fetch hotels"));
  }
};

export const getHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Hotel.findById(id);
    if (!result) {
      return next(createError(404, "Hotel not found"));
    }
    res.status(200).json(result);
  } catch (error) {
    next(createError(500, "Failed to fetch hotel"));
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    );

    res.status(200).json(list);
  } catch (error) {
    next(createError(500, "Failed to fetch hotels"));
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(createError(500, "Failed to fetch hotels"));
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return next(createError(404, "Hotel not found"));
    }
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(createError(500, "Failed to fetch hotel rooms"));
  }
};

