import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaTimes,
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaCoffee,
  FaSwimmer,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";
import FooterBanner from "../components/FooterBanner";


const Hotel = () => {
  const { user } = useContext(AuthContext);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { dates, options } = useContext(SearchContext);

  const stayDuration = dates?.length
    ? Math.ceil((dates[0].endDate - dates[0].startDate) / (1000 * 60 * 60 * 24))
    : 1;

  const { data, isLoading, isError, error } = useFetch("book", `/hotels/find/${id}`);

  const handleSliderOpen = (index) => {
    setSlideIndex(index);
    setIsSliderOpen(true);
  };

  const handleSliderNavigation = (direction) => {
    const totalSlides = data.photos.length;
    setSlideIndex((prev) =>
      direction === "left"
        ? (prev - 1 + totalSlides) % totalSlides
        : (prev + 1) % totalSlides
    );
  };

  const handleReserveClick = () => {
    if (user) {
      setIsReserveOpen(true);
    } else {
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xl text-[]">
        Loading hotel details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-xl text-red-600">
        {error.message}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <Header type="list" />

      {/* Image Slider Modal */}
      {isSliderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 px-4">
          <FaTimes
            onClick={() => setIsSliderOpen(false)}
            className="absolute right-6 top-6 cursor-pointer text-3xl text-white transition hover:text-red-400"
            aria-label="Close slider"
          />
          <FaArrowCircleLeft
            onClick={() => handleSliderNavigation("left")}
            className="absolute left-6 cursor-pointer text-4xl text-white transition hover:scale-110"
            aria-label="Previous image"
          />
          <img
            src={data.photos[slideIndex]}
            alt={`Hotel image ${slideIndex + 1}`}
            className="max-h-[85vh] rounded-lg object-contain shadow-2xl"
          />
          <FaArrowCircleRight
            onClick={() => handleSliderNavigation("right")}
            className="absolute right-6 cursor-pointer text-4xl text-white transition hover:scale-110"
            aria-label="Next image"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 lg:flex-row lg:px-8">
        {/* Hotel Details Section */}
        <section className="flex-1 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{data.name}</h1>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-xl text-red-500" />
            <span className="text-lg">{data.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              <FaStar /> {data.rating || "9.8"}
            </span>
            <span className="text-gray-600">
              {stayDuration} night{stayDuration > 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.photos.map((photo, index) => (
              <div
                key={index}
                onClick={() => handleSliderOpen(index)}
                className="cursor-pointer overflow-hidden rounded-lg shadow-md transition hover:scale-105"
              >
                <img
                  src={photo}
                  alt={`Hotel preview ${index + 1}`}
                  className="h-48 w-full object-cover"
                />
              </div>
            ))}
          </div>
          <article className="mt-6 text-gray-700 leading-relaxed">
            {data.desc}
          </article>
        </section>

        {/* Booking Sidebar */}
        <aside className="sticky top-32 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Your Stay Summary
          </h2>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ${data.cheapestPrice}
            </span>
            <span className="text-gray-600">/ night</span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-4 text-gray-700">
            {[
              { Icon: FaWifi, label: "Free Wi-Fi" },
              { Icon: FaCoffee, label: "Breakfast Included" },
              { Icon: FaSwimmer, label: "Swimming Pool" },
            ].map(({ Icon, label }, index) => (
              <li
                key={index}
                className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 shadow-xs"
              >
                <Icon className="text-[#003B95]" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-gray-800">
            Total for {options.room} room{options.room > 1 ? "s" : ""},{" "}
            {stayDuration} night{stayDuration > 1 ? "s" : ""}:
          </div>
          <div className="my-2 text-2xl font-bold text-indigo-700">
            ${stayDuration * data.cheapestPrice * options.room}
          </div>
          <button
            onClick={handleReserveClick}
            className="w-full rounded-lg bg-[#003B95] py-3 text-lg font-medium text-white shadow-md transition hover:from-indigo-700 hover:to-blue-700"
          >
            Reserve or Book Now
          </button>
        </aside>
      </main>


      {isReserveOpen && (
        <Reserve setOpen={setIsReserveOpen} hotelId={id} />
      )}
      <FooterBanner/>
    </div>
  );
};

export default Hotel;