import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Box } from '@mui/material';
import CastImageUpdate from './Components/CastImageUpdate';
import CastImageSave from './Components/CastImageSave';
import InAppBanner from './Components/InAppBanner';
import Sidebar from './Components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
        <BrowserRouter>
          <Header />
          <Box sx={{ position: 'relative', flexGrow: 1, overflow: 'hidden' }}>
            <Sidebar 
              open={sidebarOpen} 
              toggleSidebar={toggleSidebar} 
              isMinimized={sidebarOpen} 
            />
            <Box
              sx={{
                position: 'absolute',
                left: '60px',
                right: 0,
                top: 0,
                bottom: 0,
                overflow: 'auto',
                transition: 'left 0.3s ease-in-out',
                backgroundColor: 'background.default',
              }}
            >
              <Routes>
                <Route path="/cast-image-update" element={<CastImageUpdate />} />
                <Route path="/cast-image-save" element={<CastImageSave />} />
                <Route path="/in-app-banner" element={<InAppBanner />} />
              </Routes>
            </Box>
          </Box>
          <Footer />
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;