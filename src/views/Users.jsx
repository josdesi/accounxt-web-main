import { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export default function Users() {
  const [users] = useState([
    { id: 'USR001', name: 'Alice Johnson', username: 'alice.j', email: 'alice.j@example.com', phone: '555-1234', role: 'Admin', status: 'Active' },
    { id: 'USR002', name: 'Bob Smith', username: 'bob.s', email: 'bob.s@example.com', phone: '555-5678', role: 'Viewer', status: 'Active' },
    { id: 'USR003', name: 'Charlie Brown', username: 'charlie.b', email: 'charlie.b@example.com', phone: '555-9012', role: 'Viewer', status: 'Inactive' },
    // ... more users
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    role: 'Viewer',
    status: 'Active'
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      role: 'Viewer',
      status: 'Active'
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para guardar el nuevo usuario
    console.log('Nuevo usuario:', newUser);
    handleCloseModal();
  };

  const stats = [
    { title: 'Total Users', value: 10, icon: <GroupIcon />, color: '#1976d2' },
    { title: 'Active Users', value: 6, icon: <PersonIcon />, color: '#2e7d32' },
    { title: 'New Today', value: 2, icon: <NewReleasesIcon />, color: '#ed6c02' },
    { title: 'Administrators', value: 4, icon: <SupervisorAccountIcon />, color: '#d32f2f' }
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'username', headerName: 'Username', width: 130 },
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
          <Button variant="contained" onClick={handleOpenModal}>+ Add User</Button>
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

      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        PaperProps={{
          sx: { width: '500px' }
        }}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={newUser.name}
              onChange={handleInputChange}
            />
            <TextField
              name="username"
              label="Username"
              fullWidth
              value={newUser.username}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={newUser.email}
              onChange={handleInputChange}
            />
            <TextField
              name="phone"
              label="Phone"
              fullWidth
              value={newUser.phone}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={newUser.role}
                label="Role"
                onChange={handleInputChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newUser.status}
                label="Status"
                onChange={handleInputChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
