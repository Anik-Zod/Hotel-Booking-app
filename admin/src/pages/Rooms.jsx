import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt, FaBed, FaPlus, FaUsers } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import AddRoom from '../components/Add/AddRoom';

export default function Rooms() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  
  const { data, loading } = useFetch("Rooms", '/rooms');

  useEffect(() => {
    if (data?.rooms) {
      setList(data.rooms);
    } else if (Array.isArray(data)) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent delete this room type?")) return;
    try {
      await axios.delete(`/api/rooms/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Delete failed:", error.message);
    }
  };

  return (
    <div className=" min-h-screen bg-[#01090d] text-[#ecfeff] font-sans">
      
      {/* Header Container */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 p-4 bg-[#021318] rounded-lg border border-[#1b6f6a] shadow-lg shadow-cyan-900/10">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-[#ecfeff]">
            <FaBed className="text-[#3dd6c6]" /> Room Management
          </h1>
          <p className="text-xs text-[#7fa5a8] mt-1 uppercase tracking-wider">
            Define room types, pricing, and availability
          </p>
        </div>

      </div>

      {open && <AddRoom slug={'rooms'} setOpen={setOpen} />}

      {/* Table Container */}
      <div className="bg-[#021318] rounded-xl border border-[#1b6f6a] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#041f26] border-b border-[#1b6f6a]">
                <th className="p-4 text-[11px] font-extrabold text-[#3dd6c6] uppercase tracking-widest">ID</th>
                <th className="p-4 text-[11px] font-extrabold text-[#3dd6c6] uppercase tracking-widest">Room Title</th>
                <th className="p-4 text-[11px] font-extrabold text-[#3dd6c6] uppercase tracking-widest">Price</th>
                <th className="p-4 text-[11px] font-extrabold text-[#3dd6c6] uppercase tracking-widest">Capacity</th>
                <th className="p-4 text-[11px] font-extrabold text-[#3dd6c6] uppercase tracking-widest">Assigned Rooms</th>
                <th className="p-4 text-[11px] font-extrabold text-[#3dd6c6] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#041f26]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-[#7fa5a8] animate-pulse">
                    Loading room data...
                  </td>
                </tr>
              ) : list.map((room) => (
                <tr key={room._id} className="hover:bg-[#041f26]/50 transition-colors group">
                  <td className="p-4 text-xs text-[#7fa5a8]">
                    ...{room._id.slice(-6)}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#3dd6c6]">{room.title}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[#ecfeff]">${room.price}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FaUsers size={14} className="text-[#7fa5a8]" />
                      <span className="text-sm">{room.maxPeople}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {room.roomNumbers?.map((rn, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 text-[10px] bg-[#1b6f6a] text-[#ecfeff] rounded-md border border-[#3dd6c6]/20"
                        >
                          {rn.number}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <Link 
                        to={`/rooms/${room._id}`}
                        className="text-[#3dd6c6] hover:text-white transition-colors"
                        title="Edit Room"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(room._id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Delete Room"
                      >
                        <FaRegTrashAlt size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Pagination Placeholder */}
        <div className="p-4 bg-[#041f26] border-t border-[#1b6f6a] flex justify-between items-center text-xs text-textColor">
          <span>Showing {list.length} Room Types</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#1b6f6a] rounded hover:bg-[#1b6f6a] transition-colors">Prev</button>
            <button className="px-3 py-1 border border-[#1b6f6a] rounded hover:bg-[#1b6f6a] transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}                         