import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/hotels/${item._id}`)} className="flex flex-col md:flex-row mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow">
      <img
        src={item.photos[0]}
        alt={item.name}
        className="w-full md:w-64  object-cover"
      />

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {item.name}
          </h2>
          <p className="text-sm text-gray-600 mb-1">
            {item.distance} from center
          </p>
          <p className="text-sm text-green-600 mb-1">Free airport taxi</p>

          <p className="text-base text-gray-700 mt-2 mb-3">
            Studio Apartment with{" "}
            <span className="font-semibold text-green-600">
              Air conditioning
            </span>
          </p>

          <p className="text-sm text-gray-600 mb-2">{item.desc}</p>

          <div>
            <p className="text-sm text-red-600 font-semibold">
              Free cancellation
            </p>
            <p className="text-sm text-gray-500">
              You can cancel later, so lock in this great price today!
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 bg-gray-50 md:w-56">
        {item.rating && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-700">Excellent</span>
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-medium">
              {item.rating}
            </span>
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-lg font-bold text-green-600 mb-1">
            ${item.cheapestPrice}
          </span>
          <span className="text-xs text-gray-600 mb-4">
            Includes taxes and fees
          </span>
          <Link to={`/hotels/${item._id}`}>
            <button className="cursor-pointer w-full bg-[#003B95] text-white text-sm py-4 rounded-md hover:bg-blue/80 transition-colors">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
