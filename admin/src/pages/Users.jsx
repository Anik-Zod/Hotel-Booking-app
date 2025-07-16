import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt  } from 'react-icons/fa';
import useFetch from '../hooks/useFetch'
import axios from 'axios';
import AddUser from '../components/Add/AddUser';


export default function Users() {

  const columns = [
    { field: '_id', headerName: 'ID', width: 50 ,editable:"false" },
    {
      field: 'img',
      headerName: 'Image',
      width: 80,
      renderCell:(params)=>{
        return <img className="w-12 h-12 rounded-full object-cover" src={params.row.img || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"} alt="" />
      }
    },   
    {
      field: 'username',
      headerName: 'Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 190,
      editable: true,
    },
    {
      field: 'country',
      headerName: 'Country',
      type: 'String',
      width: 100,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      type: 'String',
      width: 100,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
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
            <Link to={`/users/${params.row._id}`} className="hover:opacity-75">
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
  
  const {data,loading,error} = useFetch("users","/users")

  const [list,setList] = useState()

  useEffect(()=>{
    setList(data)
  },[data])

  if(loading) console.log(loading)
  if(error) console.log(error)
  


  const handleDelete = async (id) => {
      try {
        await axios.delete(`/api/users/${id}`)
        setList(list.filter((item)=>item._id !== id))
      } catch (error) {
        console.log(error)
      }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-2 bg-white p-4 rounded shadow">
        <span className="text-lg font-semibold">Add New User</span>
        <button 
          onClick={() => setOpen(!open)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Add New User
        </button>
      </div>
      {open && <AddUser slug={"users"} columns={columns} setOpen={setOpen} />}

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
