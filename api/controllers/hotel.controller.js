import Hotel from "../models/hotel.model.js";
import { createError } from "../utils/error.js";
import Room from "../models/room.model.js";

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
  try {
    const {
      types,
      cities,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20,
    } = req.query;

    const filters = {};

    // Filter by multiple types
    if (types) {
      const typeArray = types.split(",");
      filters.type = { $in: typeArray };
    }

    // Filter by multiple cities
    if (cities) {
      const cityArray = cities.split(",");
      filters.city = { $in: cityArray };
    }

    // Price range
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const hotels = await Hotel.find(filters).skip(skip).limit(Number(limit));

    // Optionally get total count for pagination UI
    const totalCount = await Hotel.countDocuments(filters);

    res.json({
      totalCount,
      page: Number(page),
      limit: Number(limit),
      hotels,
    });
  } catch (error) {
    next(createError(500, "Failed to fetch hotels",error));
    console.log(error)
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

// aggragate function : get individual city hotel with first image
export const featured = async (req, res) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $group: {
          _id: "$city",
          hotelId:{$first:"$_id"},
          count: { $sum: 1 },
          name: { $first: "$name" },
          minPrice: { $min: "$cheapestPrice" },
          image: { $first: { $arrayElemAt: ["$photos", 0] } },
        },
      },
      {
        $project: {
          city: "$_id",
          hotelId:1,
          count: 1,
          image: 1,
          name: 1,
          minPrice: 1,
          _id: 0,
        },
      },
    ]);
    return res.json(hotels);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

//aggragte function :get expensive hotesls:
export const expensive = async (req, res) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $sort: { cheapestPrice: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          name: 1,
          photos: { $arrayElemAt: ["$photos", 0] },
          cheapestPrice: 1,
          desc: 1,
          city: 1,
          distance: 1,
          _id: 0,
        },
      },
    ]);
    return res.json(hotels);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
