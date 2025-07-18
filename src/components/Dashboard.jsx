import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

export default function Dashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> }
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Home':
        return <Typography paragraph>Welcome to the Home section!</Typography>;
      case 'Profile':
        return <Typography paragraph>This is your Profile page.</Typography>;
      case 'Settings':
        return <Typography paragraph>Settings can be configured here.</Typography>;
      default:
        return <Typography paragraph>Select an option from the menu.</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? drawerWidth : 64,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : 64,
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
            transition: 'width 0.2s'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                selected={selectedMenu === item.text}
                onClick={() => setSelectedMenu(item.text)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: sidebarOpen ? 1 : 0 }} />
              </ListItem>
            ))}
            <ListItem button onClick={onLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: sidebarOpen ? 1 : 0 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
