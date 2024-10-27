import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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
        width: isMinimized ? 70 : drawerWidth,
        flexShrink: 0,
        '&:hover': {
          width: drawerWidth,
        },
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: isMinimized ? 70 : drawerWidth,
          top: '100px',
          backgroundColor: '#333',
          color: '#fff',
          paddingTop: '10px',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            width: drawerWidth,
          },
        },
      }}
      open={open}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '8px',
        }}
      >
        <Tooltip title={isMinimized ? 'Expand' : 'Collapse'} placement="right">
          <IconButton
            onClick={toggleSidebar}
            sx={{
              margin: '8px auto',
              color: '#fff',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#4caf50',
                color: '#fff',
              },
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
            <Tooltip title={isMinimized ? item.label : ''} placement="right">
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#4caf50' : '#fff',
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
                  whiteSpace: 'nowrap',
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
