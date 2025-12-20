import Navbar from "../components/Navbar";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaTimes,
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaCoffee,
  FaSwimmer,
  FaShieldAlt,
  FaClock,
  FaPaw,
  FaCheckCircle,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";
import DateInput from "../components/search/DateInput";
import OptionsInput from "../components/search/OptionsInput";
import { toast } from "react-toastify";

const Hotel = () => {
  const { user } = useContext(AuthContext);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // const { dates, options } = useContext(SearchContext);

  //form state
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });


  const { city, selectedDates } = useContext(SearchContext);



  const handleChange = (type, amount) => {
    setOptions((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + amount),
    }));
  };

  const stayDuration = dates?.length
    ? Math.ceil((dates[0].endDate - dates[0].startDate) / (1000 * 60 * 60 * 24))
    : 1;

  const { data, isLoading, isError, error } = useFetch(
    "book",
    `/hotels/find/${id}`
  );

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

    if (user && data.cheapestPrice) {
      setIsReserveOpen(true);
    } else {
      navigate("/auth");
    }
  };

  const TotalPrice =
    (data?.cheapestPrice || 0) *
    (stayDuration > 0 ? stayDuration : 1) *
    (options.room > 0 ? options.room : 1);

  if (isLoading)
    return (
      <div className="py-20 text-center animate-pulse">
        Loading premium experience...
      </div>
    );
  if (isError)
    return (
      <div className="py-20 text-center text-red-500">{error.message}</div>
    );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 container mt-12 ">
      {/* Image Slider Modal */}
      {isSliderOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-md transition-all">
          <button
            onClick={() => setIsSliderOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <FaTimes size={24} />
          </button>

          <button
            onClick={() => handleSliderNavigation("left")}
            className="absolute left-6 rounded-full bg-white/10 p-4 text-white transition hover:bg-white/20"
          >
            <FaArrowCircleLeft size={32} />
          </button>

          <img
            src={data.photos[slideIndex] || "hotel5.jpg"}
            alt="Hotel Gallery"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />

          <button
            onClick={() => handleSliderNavigation("right")}
            className="absolute right-6 rounded-full bg-white/10 p-4 text-white transition hover:bg-white/20"
          >
            <FaArrowCircleRight size={32} />
          </button>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/" className="transition hover:text-blue">
          Home
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900">{data.name}</span>
      </nav>

      {/* flex  */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* left flex  */}
        <div className="space-y-3 lg:w-2/3 ">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
            >
              Premium Hotel
            </span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-sm" />
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-blue lg:text-5xl">
            {data.name}
          </h1>
          <div className="flex items-center gap-2 text-slate-600">
            <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 shadow-sm ring-1 ring-slate-200">
              <FaMapMarkerAlt className="text-blue" />
              <span className="text-sm font-medium">{data.address}</span>
            </div>
          </div>
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            <section className="max-w-[710px]">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Experience Luxury Comfort
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {data.desc}
              </p>
            </section>

            <section className="rounded-3xl  py-5 px-3 max-w-[600px]">
              <h3 className="mb-6 text-xl font-bold text-slate-900">
                Most Popular Facilities
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  { icon: <FaWifi size={20} />, label: "Free WiFi" },
                  { icon: <FaSwimmer size={20} />, label: "Infinity Pool" },
                  { icon: <FaCoffee size={20} />, label: "Coffee Maker" },
                  { icon: <FaShieldAlt size={20} />, label: "Top Security" },
                  { icon: <FaPaw size={20} />, label: "Pet Friendly" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 py-1 bg-blue/20 rounded-full justify-center text-slate-700"
                  >
                    <span className="flex items-center justify-center rounded-full bg-bluetext-blue">
                      {item.icon}
                    </span>
                    <span className="truncate font-medium text-[17px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-6 text-xl font-bold text-slate-900">
                Essential Information
              </h3>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center gap-8 border-b border-slate-100 p-5">
                  <div className="flex w-32 items-center gap-2 font-bold text-slate-900">
                    <FaClock className="text-blue" /> Check-in
                  </div>
                  <div className="text-slate-600 italic">14:00 — 00:00</div>
                </div>
                <div className="flex items-center gap-8 border-b border-slate-100 p-5">
                  <div className="flex w-32 items-center gap-2 font-bold text-slate-900">
                    <FaClock className="text-blue" /> Check-out
                  </div>
                  <div className="text-slate-600 italic">Until 11:00 AM</div>
                </div>
                <div className="flex items-center gap-8 p-5">
                  <div className="flex w-32 items-center gap-2 font-bold text-slate-900">
                    <FaShieldAlt className="text-blue" /> Safety
                  </div>
                  <div className="text-sm text-slate-500">
                    Equipped with smoke alarms, extinguishers, and 24/7
                    monitoring.
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* right flex  */}
        <div className="lg:col-span-1 lg:w-1/3 overflow-x-clip">
          {isReserveOpen && (
            <div className="fixed  z-40 left-0 bottom-4 mt-28 w-max sm:mt-0 sm:left-1/2   sm:-translate-x-1/2 ">
              <Reserve
                setOpen={setIsReserveOpen}
                hotelId={id}
                TotalPrice={TotalPrice}
              />
            </div>
          )}
          <aside className="sticky top-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60">
            <div className="bg-blue p-6 text-white">
              <h3 className="text-xl font-bold">Property Highlights</h3>
              <p className="mt-1 text-sm text-slate-400">
                Perfect for {stayDuration} nights
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FaCheckCircle size={14} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Located in the heart of the city (Score:{" "}
                    <span className="font-bold text-slate-900">9.5</span>)
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FaCheckCircle size={14} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    High-rated beds for ultimate sleep quality.
                  </p>
                </div>
              </div>

              <div className="space-y-1 mb-1">
                <DateInput
                  className="absolute top-40 lg:top-50 lg:fixed  lg:right-110 shadow-2xl z-40 "
                  setDates={setDates}
                  dates={dates}
                />
                <OptionsInput options={options} handleChange={handleChange} />
              </div>

              <div className="mb-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-inset ring-slate-200">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Total Price
                  </span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900">
                      ${TotalPrice}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                      All Taxes Included
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReserveClick}
                className="group relative w-full overflow-hidden rounded-xl bg-blue py-4 text-center font-bold text-white transition-all hover:bg-blue hover:shadow-lg active:scale-[0.98]"
              >
                Reserve Your Stay
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <FaShieldAlt className="text-blue" />
                Secure Payment • Instant Confirmation
              </div>
            </div>
          </aside>
        </div>
      </div>

      <main className=" max-w-7xl  py-8  ">
        {/* Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"></div>

        {/* Bento Grid Image Gallery */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3"></div>

        <div className="group mb-12 grid h-[500px] grid-cols-4 grid-rows-2 gap-3">
          <div
            className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => handleSliderOpen(0)}
          >
            <img
              src={data.photos[0]}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              alt="Main"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-transparent" />
          </div>
          {data.photos.slice(1, 4).map((photo, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => handleSliderOpen(i + 1)}
            >
              <img
                src={photo}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
                alt="Hotel"
              />
            </div>
          ))}
          <div
            className="relative overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => handleSliderOpen(4)}
          >
            <img
              src={data.photos[4]}
              className="h-full w-full object-cover brightness-50"
              alt="Extra"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-2xl font-bold">
                +{data.photos.length - 4}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest">
                Photos
              </span>
            </div>
          </div>
        </div>
      </main>

      {isReserveOpen && (
        <div className="fixed bg-black/10 backdrop-blur-[3px]  inset-0" />
      )}
    </div>
  );
};

export default Hotel;

