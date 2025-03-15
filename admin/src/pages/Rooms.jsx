import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import AddRoom from '../components/Add/AddRoom';

export default function Rooms() {
  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    {
      field: 'title',
      headerName: 'Room Title',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 80,
    },
    {
      field: 'maxPeople',
      headerName: 'Max People',
      type: 'number',
      width: 100,
    },
    {
      field: 'des',
      headerName: 'Description',
      width: 250,
    },
    {
      field: 'roomNumbers',
      headerName: 'Room Numbers',
      width: 180,
      renderCell: (params) => (
        <span>{params.row.roomNumbers.map((room) => room.number).join(', ')}</span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => (
        <div className="flex mt-3 items-center space-x-4">
          <Link to={`/rooms/${params.row._id}`} className="hover:opacity-75">
            <FaEdit className="text-blue-600 cursor-pointer" size={17} />
          </Link>
          <FaRegTrashAlt
            className="text-red-600 cursor-pointer hover:opacity-75"
            size={17}
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch('/api/rooms');

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-2 bg-white p-4 rounded shadow">
        <span className="text-lg font-semibold">Add New Room</span>
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Add New Room
        </button>
      </div>
      {open && <AddRoom slug={'rooms'} columns={columns} setOpen={setOpen} />}

      <Box sx={{ height: 590, width: '100%' }} className="bg-white p-4 rounded shadow">
        <DataGrid
          rows={list}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
        />
      </Box>
    </div>
  );
}
