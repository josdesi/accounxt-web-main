import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function RolesAndPermissions() {
  const [roles] = useState([
    { id: 1, name: 'Global Administrator', description: 'Total system access and configuration.' },
    { id: 2, name: 'Content Manager', description: 'Manages content creation and publishing.' },
    { id: 3, name: 'News Editor', description: 'Edits and publishes articles in the news section.' },
    { id: 4, name: 'Data Analyst', description: 'Accesses reports and performance metrics.' },
    { id: 5, name: 'Technical Support', description: 'Resolves incidents and assists users.' },
    { id: 6, name: 'Security Reviewer', description: 'Audits and ensures system integrity.' },
    { id: 7, name: 'Backend Developer', description: 'Manages server logic and database.' },
    { id: 8, name: 'UI/UX Designer', description: 'Designs interfaces and user experience.' },
  ]);

  const columns = [
    { 
      field: 'name', 
      headerName: 'Role Name',
      flex: 1,
      minWidth: 200 
    },
    { 
      field: 'description', 
      headerName: 'Description',
      flex: 2,
      minWidth: 300
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: () => (
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', padding: 3 }}>
      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Existing Roles</Typography>
          <Box>
            <Button
              startIcon={<FilterListIcon />}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Filter
            </Button>
            <Button
              startIcon={<SortIcon />}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Sort
            </Button>
            <Button
              variant="contained"
              color="primary"
            >
              + Add Role
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={roles}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16, 24]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#fafafa'
            }
          }}
        />
      </Card>
    </Box>
  );
}