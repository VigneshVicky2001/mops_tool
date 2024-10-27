import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const Sidebar = ({ open, toggleSidebar, isMinimized }) => {
  const [isHovered, setIsHovered] = useState(false);
  const drawerWidth = 264;
  const minimizedWidth = 70;
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

  const currentWidth = isMinimized ? (isHovered ? drawerWidth : minimizedWidth) : drawerWidth;

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: currentWidth,
          top: '100px',
          backgroundColor: '#333',
          color: '#fff',
          paddingTop: '10px',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
        },
      }}
      open={open}
    >
      <List sx={{ paddingTop: '10px' }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigateToPage(item.path)}
            sx={{
              cursor: 'pointer',
              justifyContent: 'initial',
              px: 2,
              py: 1.5,
              minHeight: 56,
              backgroundColor: location.pathname === item.path ? '#444' : 'transparent',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            <Tooltip title={(isMinimized && !isHovered) ? item.label : ''} placement="right">
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#4caf50' : '#fff',
                  minWidth: 48,
                }}
              >
                {item.icon}
              </ListItemIcon>
            </Tooltip>

            <ListItemText
              primary={item.label}
              sx={{
                opacity: (isMinimized && !isHovered) ? 0 : 1,
                transition: 'opacity 0.2s',
                color: location.pathname === item.path ? '#4caf50' : '#fff',
                whiteSpace: 'nowrap',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;