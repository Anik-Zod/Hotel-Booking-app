import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaTimesCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";

const Hotel = () => {
  const{user} = useContext(AuthContext)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const navigate = useNavigate(); 

  const { id } = useParams();
  
  const { dates, options } = useContext(SearchContext);
  const days =  dates?.length > 0 ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;
  function dayDifference(date1, date2) {
    if (!date1 || !date2) return 1;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }
  

  const { data, loading, error } = useFetch(`/api/hotels/find/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleReserve = (e)=>{
    if(user){
       setOpenModal(true)
    }else{
       navigate("/login")
    }
  }


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="container mx-auto p-4">
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <FaTimesCircle
              className="text-white text-3xl cursor-pointer absolute top-4 right-4"
              onClick={() => setOpen(false)}
            />
            <FaArrowCircleLeft
              className="text-white text-3xl cursor-pointer absolute left-4"
              onClick={() => handleMove("l")}
            />
            <div className="max-w-3xl mx-auto">
              <img
                src={data?.photos[slideNumber]}
                alt=""
                className="w-full h-auto"
              />
            </div>
            <FaArrowCircleRight
              className="text-white text-3xl cursor-pointer absolute right-4"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h1 className="text-2xl font-bold mb-2">{data?.name}</h1>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <span>{data?.address}</span>
          </div>
          <span className="block mb-2">
            Excellent location – ${data?.distance} from center
          </span>
          <span className="block mb-4">
            Book a stay over ${data?.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {data?.photos?.map((photo, i) => (
              <div
                className="cursor-pointer"
                key={i}
                onClick={() => handleOpen(i)}
              >
                <img src={photo} alt="" className="w-full h-auto rounded-lg" />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl font-bold mb-2">{data?.title}</h1>
              <p>{data?.desc}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h1 className="text-lg font-bold mb-2">
                Perfect for a {days}-night stay!
              </h1>
              <span className="block mb-2">
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2 className="text-xl font-bold mb-4">
                <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                nights)
              </h2>
              <button onClick={handleReserve} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;
