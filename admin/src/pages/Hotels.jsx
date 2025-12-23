import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt, FaHotel, FaPlus, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import AddHotel from '../components/Add/AddHotel';

export default function Hotels() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  
  const { data, isLoading } = useFetch('hotels', `/hotels`);

  useEffect(() => {
    if (data?.hotels) {
      setList(data.hotels);
    }
  }, [data]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`/api/hotels/${id}`);
        setList(list.filter(item => item._id !== id));
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className=" min-h-screen bg-[#01090d] text-[#ecfeff] font-sans">
      
      {/* Header Section */}
      <div className="flex border border-primary/60 rounded-lg p-4 flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-[#ecfeff]">
            <FaHotel className="text-[#3dd6c6]" /> Hotel Inventory
          </h1>
          <p className="text-xs  mt-1 tracking-wide uppercase text-primary">
            Showing {list.length} properties from database
          </p>
        </div>
        
      </div>

      {open && <AddHotel slug={"hotels"} setOpen={setOpen} />}

      {/* Table Container */}
      <div className="bg-[#021318] rounded-xl border border-[#1b6f6a] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#041f26] border-b border-[#1b6f6a]">
                <th className="p-4 text-[11px] font-black text-[#3dd6c6] uppercase tracking-widest">Photo</th>
                <th className="p-4 text-[11px] font-black text-[#3dd6c6] uppercase tracking-widest">Hotel Details</th>
                <th className="p-4 text-[11px] font-black text-[#3dd6c6] uppercase tracking-widest">Type</th>
                <th className="p-4 text-[11px] font-black text-[#3dd6c6] uppercase tracking-widest">Rating</th>
                <th className="p-4 text-[11px] font-black text-[#3dd6c6] uppercase tracking-widest">Price</th>
                <th className="p-4 text-[11px] font-black text-[#3dd6c6] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#041f26]">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-[#7fa5a8] animate-pulse uppercase tracking-widest text-sm">
                    Retrieving data from mainframe...
                  </td>
                </tr>
              ) : (
                list.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-[#041f26]/60 transition-colors group">
                    <td className="p-4">
                      <img 
                        src={hotel.photos?.[0] || 'https://via.placeholder.com/40'} 
                        alt={hotel.name}
                        className="w-10 h-10 rounded-lg object-cover border border-[#1b6f6a] group-hover:border-[#3dd6c6] transition-colors"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#3dd6c6]">{hotel.name}</span>
                        <span className="text-[10px] text-[#7fa5a8] flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt size={10} /> {hotel.city}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 text-[10px] border border-[#1b6f6a] text-[#7fa5a8] rounded uppercase">
                        {hotel.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-yellow-400">
                        <FaStar size={12} />
                        <span className="text-sm font-medium">{hotel.rating || "N/A"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#ecfeff]">${hotel.cheapestPrice}</span>
                        <span className="text-[9px] text-[#7fa5a8] italic">per night</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link 
                          to={`/hotels/${hotel._id}`}
                          className="p-2 text-[#3dd6c6] hover:bg-[#3dd6c6]/10 rounded-full transition-colors"
                        >
                          <FaEdit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(hotel._id)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                        >
                          <FaRegTrashAlt size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Footer */}
        <div className="p-4 bg-[#041f26] border-t border-[#1b6f6a] flex flex-col sm:row justify-between items-center gap-4 text-xs text-[#7fa5a8]">
          <p>Displaying results from the secure inventory node</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-[#1b6f6a] hover:bg-[#1b6f6a] hover:text-white rounded transition-all">Previous</button>
            <button className="px-4 py-1.5 border border-[#1b6f6a] hover:bg-[#1b6f6a] hover:text-white rounded transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}