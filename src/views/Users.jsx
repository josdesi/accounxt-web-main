import { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  Button,
  Chip
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export default function Users() {
  const [users] = useState([
    { id: 'USR001', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-1234', role: 'Admin', status: 'Active' },
    { id: 'USR002', name: 'Bob Smith', email: 'bob.s@example.com', phone: '555-5678', role: 'Viewer', status: 'Active' },
    { id: 'USR003', name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '555-9012', role: 'Viewer', status: 'Inactive' },
    // ... more users
  ]);

  const stats = [
    { title: 'Total Users', value: 10, icon: <GroupIcon />, color: '#1976d2' },
    { title: 'Active Users', value: 6, icon: <PersonIcon />, color: '#2e7d32' },
    { title: 'New Today', value: 2, icon: <NewReleasesIcon />, color: '#ed6c02' },
    { title: 'Administrators', value: 4, icon: <SupervisorAccountIcon />, color: '#d32f2f' }
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Admin' ? 'primary' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>User Management</Typography>
      
      {/* Statistics */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ flex: 1, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ 
                backgroundColor: `${stat.color}15`,
                borderRadius: '50%',
                p: 1,
                mr: 2,
                display: 'flex'
              }}>
                {stat.icon}
              </Box>
              <Typography variant="h4">{stat.value}</Typography>
            </Box>
            <Typography color="textSecondary" variant="body2">{stat.title}</Typography>
          </Card>
        ))}
      </Box>

      {/* Users Table */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Users List</Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>Filter</Button>
          <Button variant="outlined" sx={{ mr: 1 }}>Export</Button>
          <Button variant="contained">+ Add User</Button>
        </Box>
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}
