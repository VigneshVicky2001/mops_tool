import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        padding: '5px', 
        backgroundColor: '#333', 
        color: '#fff',
        textAlign: 'center', 
        position: 'fixed', 
        bottom: '0px', 
        width: '100%',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="body2">
        &copy; Quickplay
      </Typography>
    </Box>
  );
};

export default Footer;
