import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const Sidebar = ({ open, toggleSidebar, isMinimized, onHoverChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const drawerWidth = 264;
  const minimizedWidth = 60;
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        whiteSpace: 'nowrap',
        position: 'absolute',
        height: '100%',
        zIndex: 2,
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: currentWidth,
          top: 0,
          bottom: 0,
          backgroundColor: '#333',
          color: '#fff',
          paddingTop: '10px',
          // transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
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
              transition: 'background-color 0.3s ease',
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