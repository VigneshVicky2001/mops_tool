import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import qp_logo from '../Assets/quickplay-logo-color-white.png';
import LogoutIcon from '@mui/icons-material/LogoutSharp';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {

    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#222222', 
        top: 0,
        minHeight: '100px',
        height: '100px',
        overflow: 'hidden',
      }}
    >
      <Toolbar
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          padding: '0 24px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <img src={qp_logo} alt="Quickplay Logo" style={{width: '100%', maxWidth: '208px', height: 'auto'}} />
        </Box>

        {location.pathname === '/cast-image-update' && (
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              backgroundColor: '#171717',
              color: '#fff',
              fontWeight: 'bold',
              padding: '8px 16px',
              fontSize: '16px',
              transition: 'transform 0.3s, background-color 0.3s',
              '&:hover': {
                backgroundColor: '#e26838',
                transform: 'scale(1.05)',
                color: 'black',
              },
            }}
          >
            <LogoutIcon />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;