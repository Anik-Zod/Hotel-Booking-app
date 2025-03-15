import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt  } from 'react-icons/fa';
import useFetch from '../hooks/useFetch'
import axios from 'axios'
import AddHotel from '../components/Add/AddHotel';

export default function Hotels() {

  const columns = [
    { field: '_id', headerName: 'ID', width: 20 },
    {
      field: 'photos',
      headerName: 'Photo',
      width: 100,
      renderCell:(params)=>{
        return <img className="w-12 h-12 rounded-full object-cover" src={params.row.photos[0] || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"} alt="" />
      }
    },   
    {
      field: 'name',
      headerName: 'Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
    },
    {
      field: 'city',
      headerName: 'City',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'string',
      width: 80,
      editable: true,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      type: 'string',
      width: 60,
      editable: true,
    },
    {
      field: 'cheapestPrice',
      headerName: 'Minimum price',
      type: 'number',
      width: 160,
      editable: true,
    },
    {
      field: 'featured',
      headerName: 'Featured',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field:"action",
      headerName:"Action",
      width:90,
      editable: false,
      renderCell:(params)=>{
        return (
          <div className="flex mt-3 items-center space-x-4 ">
            <Link to={`/hotels/${params.row.id}`} className="hover:opacity-75">
          <FaEdit className="text-blue-600 cursor-pointer" size={17} />
            </Link>
            <FaRegTrashAlt  
          className="text-red-600 cursor-pointer hover:opacity-75" 
          size={17} 
          onClick={() => handleDelete(params.row._id)} 
            />
          </div>
        )
      }
  }
  ];

  const [open,setOpen] = useState(false);

  const[list,setList]=useState()
  const{data, loading, error} = useFetch(`/api/hotels`)

  useEffect(()=>{
    setList(data)
  },[data])

  const handleDelete = async (id) => {
      try {
         await axios.delete(`/api/hotels/${id}`)
         setList(list.filter(item=>item._id!=id))
      } catch (error) {
        console.log(error.message)
      } 
    };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-2 bg-white p-4 rounded shadow">
        <span className="text-lg font-semibold">Add New Hotels</span>
        <button 
          onClick={() => setOpen(!open)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Add New Hotel
        </button>
      </div>
      {open && <AddHotel slug={"hotels"} columns={columns} setOpen={setOpen} />}

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
          getRowId={row=>row._id}
        />
      </Box>
    </div>
  );
}


