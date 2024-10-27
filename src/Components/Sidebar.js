import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const Sidebar = ({ open, toggleSidebar, isMinimized }) => {
  const drawerWidth = isMinimized ? 70 : 264;
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPage = (path) => {
    navigate(path);
  };

  const menuItems = [
    { label: 'AHA cast image save', path: '/cast-image-save', icon: <AddPhotoAlternateIcon /> },
    { label: 'AHA cast image update', path: '/cast-image-update', icon: <AddToPhotosIcon /> },
    { label: 'In-App Banner', path: '/in-app-banner', icon: <AdUnitsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          top: '100px',
          backgroundColor: '#333',
          color: '#fff',
          paddingTop: '10px',
          transition: 'width 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        },
      }}
      open={open}
    >
      <Box sx={{ display: 'flex', justifyContent: isMinimized ? 'center' : 'initial' }}>
        <Tooltip title={isMinimized ? 'Expand' : 'Collapse'} placement="right">
          <IconButton
            onClick={toggleSidebar}
            sx={{
              margin: isMinimized ? '8px auto' : '8px 10px',
              color: '#fff',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#4caf50',
                color: '#fff',
              },
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            {isMinimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <List sx={{ paddingTop: '10px' }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigateToPage(item.path)}
            sx={{
              cursor: 'pointer',
              justifyContent: isMinimized ? 'center' : 'initial',
              px: isMinimized ? 1 : 2,
              py: 2,
              backgroundColor: location.pathname === item.path ? '#444' : 'transparent',
              '&:hover': {
                backgroundColor: '#555',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Tooltip title={isMinimized ? item.label : ''} placement="right">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isMinimized ? 0 : 2,
                  justifyContent: 'center',
                  color: location.pathname === item.path ? '#4caf50' : '#fff',
                  transition: 'margin 0.3s ease',
                }}
              >
                {item.icon}
              </ListItemIcon>
            </Tooltip>

            {!isMinimized && (
              <ListItemText
                primary={item.label}
                sx={{
                  color: location.pathname === item.path ? '#4caf50' : '#fff',
                  opacity: isMinimized ? 0 : 1,
                  transition: 'opacity 0.4s ease, margin-left 0.3s ease',
                  marginLeft: isMinimized ? '0px' : '10px',
                  whiteSpace: 'nowrap' // Avoid text wrapping
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
