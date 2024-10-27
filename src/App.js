import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Box } from '@mui/material';
import CastImageUpdate from './Components/CastImageUpdate';
import CastImageSave from './Components/CastImageSave';
import InAppBanner from './InAppBanner';
import Sidebar from './Components/Sidebar';
import React, { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr', minHeight: '100vh' }}>
        <BrowserRouter>
          <Header />
          <Box sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} isMinimized={sidebarOpen} />
            <Routes>
              <Route path="/cast-image-update" element={<CastImageUpdate />} />
              <Route path="/cast-image-save" element={<CastImageSave />} />
              <Route path="/in-app-banner" element={<InAppBanner />} />
            </Routes>
          </Box>
          <Footer />
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;
