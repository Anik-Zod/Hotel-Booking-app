import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Avatar, Typography, Button, IconButton, Tooltip, Chip, ThemeProvider, createTheme } from "@mui/material";
import { FaEdit, FaRegTrashAlt, FaPlus, FaUserShield } from "react-icons/fa";
import { authClient } from "../../lib/auth-client";

// Custom theme to force MUI components to respect your dark palette
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3dd6c6' },
    background: { default: '#041f26', paper: '#021318' },
    text: { primary: '#ecfeff', secondary: '#7fa5a8' },
  },
});

export default function Users() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await authClient.admin.listUsers({
      query: { limit: 200 },
    });

    if (error) {
      setError(error);
      setList([]);
    } else {
      setList(data?.users ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    // Safety: disabled as requested
    console.log("Delete restricted for safety:", id);
  };

  const columns = [
    {
      field: "user",
      headerName: "User",
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, height: "100%" }}>
          <Avatar 
            src={params.row.image} 
            alt={params.row.name} 
            sx={{ width: 32, height: 32, bgcolor: "#1b6f6a", color: "#3dd6c6", fontSize: "0.875rem", border: '1px solid #3dd6c6' }}
          >
            {params.row.name?.charAt(0)}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#ecfeff" }}>
              {params.row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "#7fa5a8" }}>
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.row.role || "User"} 
          size="small" 
          sx={{ 
            borderColor: params.row.role === "admin" ? "#3dd6c6" : "#1b6f6a",
            color: params.row.role === "admin" ? "#3dd6c6" : "#7fa5a8",
            bgcolor: 'transparent'
          }}
          variant="outlined"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Joined",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "#7fa5a8" }}>
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      )
    },
    {
      field: "action",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit User">
            <IconButton 
              size="small" 
              component={Link} 
              to={`/users/${params.row.id}`}
              sx={{ color: "#3dd6c6", "&:hover": { bgcolor: "rgba(61, 214, 198, 0.1)" } }}
            >
              <FaEdit size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete (Restricted)">
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(params.row.id);
              }}
              sx={{ color: "#7fa5a8", opacity: 0.5, "&:hover": { cursor: 'not-allowed' } }}
            >
              <FaRegTrashAlt size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className=" min-h-screen" style={{ backgroundColor: "#01090d" }}>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 border border-primary/60 p-4 rounded-lg gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "#ecfeff" }}>
              <FaUserShield style={{ color: "#3dd6c6" }} /> User Management
            </h1>
            <p style={{ color: "#7fa5a8" }} className="text-sm">Monitor and manage access controls across the platform.</p>
          </div>
          <Button 
            variant="contained" 
            startIcon={<FaPlus />}
            sx={{ 
              bgcolor: "#3dd6c6", 
              color: "#041f26",
              textTransform: "none", 
              borderRadius: "4px", 
              fontWeight: 700,
              "&:hover": { bgcolor: "#32b3a6" }
            }}
            onClick={() => navigate("/users/new")}
          >
            Add New Member
          </Button>
        </div>

        {/* Main Table Card */}
        <Box 
          sx={{ 
            height: 650, 
            width: "100%", 
            bgcolor: "#021318", 
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #1b6f6a",
          }}
        >
          <DataGrid
            rows={list}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            pageSizeOptions={[10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              color: "#ecfeff",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#041f26",
                color: "#3dd6c6",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                borderBottom: "1px solid #1b6f6a",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #041f26",
              },
              "& .MuiDataGrid-footerContainer": {
                bgcolor: "#021318",
                borderTop: "1px solid #1b6f6a",
                color: "#ecfeff",
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "rgba(61, 214, 198, 0.05)",
              },
              "& .MuiDataGrid-iconSeparator": {
                display: "none",
              },
              "& .MuiTablePagination-root": {
                color: "#7fa5a8",
              }
            }}
            onRowClick={(params) => navigate(`/users/${params.id}`)}
          />
        </Box>

        {error && (
          <div className="mt-4 p-4 rounded border text-sm" style={{ backgroundColor: "#1b6f6a", borderColor: "#3dd6c6", color: "#ecfeff" }}>
            <strong>System Error:</strong> {error.message || "Failed to sync user data."}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}