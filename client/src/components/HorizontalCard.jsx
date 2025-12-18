import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Car,
  Wind,
  CheckCircle,
  Star,
  ChevronRight,
} from "lucide-react";
import { BiSolidOffer } from "react-icons/bi";

const HorizontalCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/hotels/${item._id}`)}
      className="group flex flex-row  w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer"
    >
      {/* Image Section - Fixed width on mobile, larger on PC */}
      <div className="relative w-32 sm:w-48 md:w-72 shrink-0 overflow-hidden">
        <img
          src={item.photos[0]}
          alt={item.name}
          className="max-h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className=" absolute top-2 left-2 space-y-2.5 text-xs">

          {item.rating >= 4.5 && (
            <p className=" bg-blue text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Top Rated
            </p>
          )}
          <p className="bg-yellow-500 text-white  px-3 rounded-full flex gap-2 items-center">
            {" "}
            <BiSolidOffer size={20} /> 25%
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Info Column */}
        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-lg md:text-2xl font-bold text-slate-900 group-hover:text-blue transition-colors line-clamp-1">
                {item.name}
              </h2>
            </div>

            <div className="flex items-center gap-1 text-slate-500 mt-1">
              <MapPin size={14} className="text-blue" />
              <span className="text-xs md:text-sm">
                {item.distance} from center
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="flex items-center gap-1 bg-green-400/10  text-green-700 px-2 py-1 rounded-md text-[10px] md:text-xs font-semibold">
                <Car size={14} /> Free Airport Taxi
              </span>
              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[10px] md:text-xs font-semibold">
                <Wind size={14} /> AC included
              </span>
            </div>

          </div>

          <div className="mt-3 flex items-center gap-1 text-emerald-600">
            <CheckCircle size={14} />
            <span className="text-xs font-bold">
              Free cancellation available
            </span>
          </div>
        </div>

        {/* Pricing & Rating Sidebar */}
        <div className="w-full md:w-56 p-4 md:p-6 bg-slate-50/50 border-t md:border-t-0 md:border-l border-slate-100 flex md:flex-col justify-between items-center md:items-end">
          {/* Rating Section */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Excellent</p>
              <p className="text-[10px] text-slate-500">850 reviews</p>
            </div>
            <div className="bg-blue text-white h-10 w-10 flex items-center justify-center rounded-lg font-bold shadow-md shadow-blue-200">
              {item.rating || "4.8"}
            </div>
          </div>

          {/* Price Section */}
          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] text-slate-400 line-through font-medium">
              ${Math.round(item.cheapestPrice * 1.2)}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                ${item.cheapestPrice}
              </span>
              <span className="text-xs text-slate-500 font-medium">/night</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 mb-3 hidden md:block">
              Includes taxes & fees
            </p>

            <Link to={`/hotels/${item._id}`} className="hidden md:block w-full">
              <button className="w-full bg-blue text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all flex items-center justify-center gap-2 group/btn">
                See availability
                <ChevronRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
