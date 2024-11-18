import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const TabContent = ({ region, source, image }) => {
  return (
    <Box sx={{ marginBottom: '20px', textAlign: 'left' }}>
      <Typography variant="h6" sx={{ marginBottom: '8px' }}>Region: {region}</Typography>
      <Typography variant="body1" sx={{ marginBottom: '8px' }}>Source: {source}</Typography>
      <Typography variant="body1">Image: {image}</Typography>
    </Box>
  );
};

const InAppBanner = () => {
  const [activeTab, setActiveTab] = useState('Anonymous');

  // Tab-specific data
  const tabData = {
    Anonymous: [
      { region: 'US', source: 'telugu-annual-dl', image: 'telugu-annual-dl' },
      { region: 'IN', source: 'telugu-annual-dl', image: 'telugu-annual-dl' },
    ],
    Registered: [
      { region: 'EU', source: 'registered-source', image: 'registered-image' },
      { region: 'FR', source: 'registered-source-2', image: 'registered-image-2' },
    ],
    Churned: [
      { region: 'IN', source: 'churned-source', image: 'churned-image' },
      { region: 'US', source: 'churned-source-2', image: 'churned-image-2' },
    ],
  };

  return (
    <Box
      sx={{
        height: '85vh',
        width: '100vw',
        padding: '20px',
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      {/* Tab Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {['Anonymous', 'Registered', 'Churned'].map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            sx={{
              backgroundColor: activeTab === tab ? '#ff9800' : '#555',
              color: '#fff',
              margin: '0 10px',
              '&:hover': { backgroundColor: '#ff9800' },
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* Tab Content */}
      <Box>
        {tabData[activeTab].map((data, index) => (
          <TabContent
            key={index}
            region={data.region}
            source={data.source}
            image={data.image}
          />
        ))}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9800',
            marginRight: '10px',
            '&:hover': { backgroundColor: '#e68900' },
          }}
        >
          Preview
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9800',
            '&:hover': { backgroundColor: '#e68900' },
          }}
        >
          Save & Publish
        </Button>
      </Box>
    </Box>
  );
};

export default InAppBanner;
