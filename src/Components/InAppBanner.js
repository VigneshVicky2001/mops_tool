import React from 'react'
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const InAppBanner = () => {
  return (
    <Box
    sx={{
      height: '85vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}
  >
    <ConstructionIcon
      sx={{
        fontSize: { xs: '15rem', md: '30rem' },
        color: '#e0e0e0',
        opacity: 0.1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />

    <Typography
      variant="h1"
      sx={{
        color: '#ccc',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        opacity: 0.1,
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: { xs: '3rem', md: '6rem' },
        whiteSpace: 'nowrap',
      }}
    >
      Under Development
    </Typography>

    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '80%',
      }}
    >
      <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
        This feature is currently under development.
      </Typography>
    </Box>
  </Box>
  )
}

export default InAppBanner