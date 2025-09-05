import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import AddUser from "../components/Add/AddUser";

export default function Users() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch("users", "/users");
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(Array.isArray(data) ? data : []);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90, editable: false },
    {
      field: "img",
      headerName: "Image",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={
            params.row.img ||
            "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
          }
          alt=""
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    { field: "username", headerName: "Name", flex: 1, minWidth: 140 },
    { field: "email", headerName: "Email", flex: 1.4, minWidth: 200, type: "string", editable: true },
    { field: "country", headerName: "Country", flex: 0.8, minWidth: 120, type: "string", editable: true },
    { field: "city", headerName: "City", flex: 0.8, minWidth: 120, type: "string", editable: true },
    { field: "phone", headerName: "Phone", flex: 0.9, minWidth: 140, type: "string", editable: true },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 170,
      valueGetter: (params) => {
        const v = params.row?.createdAt;
        if (!v) return "";
        const d = new Date(v);
        return isNaN(d.getTime()) ? String(v) : d.toLocaleString();
      },
      editable: false,
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
    },
    {
      field: "action",
      headerName: "Action",
      width: 110,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div
          className="flex mt-3 items-center space-x-4"
          onClick={(e) => e.stopPropagation()} // prevent row navigation
        >
          <Link to={`/users/${params.row._id}`} onClick={(e) => e.stopPropagation()}>
            <FaEdit className="text-blue-600 cursor-pointer hover:opacity-75" size={17} />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.row._id);
            }}
            className="cursor-pointer"
            title="Delete"
          >
            <FaRegTrashAlt className="text-red-600 hover:opacity-75" size={17} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-2 bg-white p-4 rounded shadow">
        <span className="text-lg font-semibold">Add New User</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Add New User
        </button>
      </div>

      {open && <AddUser slug="users" columns={columns} setOpen={setOpen} />}

      <Box sx={{ height: 590, width: "100%" }} className="bg-white p-4 rounded shadow">
        <DataGrid
          rows={list ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          // navigate to user detail on row click
          onRowClick={(params) => navigate(`/users/${params.id}`)}
          // better defaults
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: {
              columnVisibilityModel: {
                // ensure all are visible by default
                _id: true,
                img: true,
                username: true,
                email: true,
                country: true,
                city: true,
                phone: true,
                createdAt: true,
                action: true,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight={false}
        />
        {error && <div className="text-red-600 mt-2">Failed to load users: {String(error?.message || error)}</div>}
      </Box>
    </div>
  );
}
