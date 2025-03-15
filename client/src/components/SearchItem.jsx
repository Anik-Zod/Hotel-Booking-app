import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {

  return (
    <div className="flex flex-col md:flex-row mb-6 border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <img
        src={item.photos[0]}
        alt="Hotel"
        className="w-full md:w-64 h-64 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
      />
      <div className="p-4 flex-1">
        <h1 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h1>
        <span className="text-sm text-gray-600 mb-1">
          {item.distance} from center
        </span>
        <span className="text-sm text-gray-600 mb-1">Free airport taxi</span>
        <p className="text-lg font-semibold mt-2 mb-3">
          Studio Apartment with{" "}
          <span className="text-green-500  font-bold">Air conditioning</span>
        </p>
        <span className="text-sm text-gray-600 mb-1">{item.desc}</span>
        <div className="mt-2">
          <span className="text-sm text-red-600 font-semibold">
            Free cancellation
          </span>
          <p className="text-sm text-gray-600">
            You can cancel later, so lock in this great price today!
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 w-full md:w-56 flex flex-col justify-between">
        {item.rating && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Excellent</span>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">
              {item.rating}
            </button>
          </div>
        )}
        <div className="flex flex-col items-start">
          <span className="text-lg font-bold text-green-600 mb-2">${item.cheapestPrice}</span>
          <span className="text-sm text-gray-600 mb-3">
            Includes taxes and fees
          </span>
          <Link to={`/hotels/${item._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"> See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
