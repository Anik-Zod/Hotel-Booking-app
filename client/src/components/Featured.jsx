import { motion } from "motion/react";
import useFetch from "../hooks/useFetch";
import SectionHeader from "./SectionHeader";
import { useEffect, useRef, useState } from "react";
import {
  Hotel,
  MapPin,
  Ticket,
  Activity,
  SkipForward,
  Car,
  Plane,
  Star,
  Heart,
} from "lucide-react";
import { BsAirplane } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Featured() {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  const { data, isLoading, error, isError } = useFetch(
    "featured",
    "/hotels/featured"
  );

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, [data]);

  const getFakeRating = () => (Math.random() * 2 + 3).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="animate-pulse text-blue-600 font-medium text-base">
          Loading featured properties...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-600 p-4 my-8 mx-auto max-w-md rounded-sm shadow-sm">
        <p className="text-red-700 font-semibold text-sm">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <motion.section 
      className="container pt-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionHeader
        title="Featured Stays"
        highlight="Top Destinations"
        description="Browse our top-rated tours and seasonal specials. All packages include round-trip tickets, luxury accommodation, and guided local tours."
      />

      <motion.div
        ref={carouselRef}
        className="overflow-x-auto cursor-grab no-scrollbar"
        whileTap={{ cursor: "grabbing" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6 py-6"
        >
          {data.map((hotel, index) => (
            <motion.div 
              key={hotel.hotelId} 
              className="min-w-[260px]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TravelCard hotel={hotel} rating={getFakeRating()} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

const TravelCard = ({ hotel, rating = 4.9 }) => {
  const navigate = useNavigate()
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative max-w-[300px] bg-white rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100/50 border border-gray-100"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative p-2">
        <div className="overflow-hidden rounded-[20px] aspect-[4/3]">
          <img
            src={hotel.photos?.[0] || hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* TOP BADGES */}
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-orange-400 fill-orange-400" />
            <span className="font-bold text-xs text-gray-800">{rating}</span>
          </div>
        </div>

        <motion.button 
          className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors group/heart"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            size={18}
            className="text-gray-400 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all"
          />
        </motion.button>
      </div>

      {/* CONTENT */}
      <div className="px-5 pb-6 pt-2">
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-1 text-blue-600 font-semibold text-[10px] uppercase tracking-wider">
            <MapPin size={12} />
            {hotel.city}
          </div>
          <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
            {hotel.name || "Luxury Escape"}
          </h2>
          <p className="text-gray-500 text-xs font-medium">
            3 Days · 4 Nights · All Inclusive
          </p>
        </div>

        {/* AMENITIES - Minimalist Row */}
        <div className="flex items-center gap-4 py-4 border-y border-gray-50 mb-4">
          <div
            className="flex items-center gap-1.5 text-gray-400"
            title="Flights"
          >
            <Plane size={16} strokeWidth={1.5} />
          </div>
          <div
            className="flex items-center gap-1.5 text-gray-400"
            title="Hotel"
          >
            <Hotel size={16} strokeWidth={1.5} />
          </div>
          <div
            className="flex items-center gap-1.5 text-gray-400"
            title="Transport"
          >
            <Car size={16} strokeWidth={1.5} />
          </div>
          <div
            className="flex items-center gap-1.5 text-gray-400"
            title="Activities"
          >
            <Activity size={16} strokeWidth={1.5} />
          </div>
          <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
            +4 More
          </span>
        </div>

        {/* PRICE SECTION */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-gray-400 line-through text-xs decoration-red-400">
              $800
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900">
                ${hotel.cheapestPrice || 599}
              </span>
              <span className="text-gray-400 text-[10px] font-medium uppercase tracking-tighter">
                / Person
              </span>
            </div>
          </div>

          <motion.button
            onClick={()=>navigate(`/hotels/${hotel.hotelId}`)}
            className="bg-gray-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-yellow transition-colors shadow-lg shadow-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
