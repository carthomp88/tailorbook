import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import haircutImage from './haircut.jpg';
import massageImage from './massage.jpg';
import manicureImage from './manicure.webp';
import facialImage from './facial.jpg';

const images = {
  Haircut: haircutImage,
  Massage: massageImage,
  Manicure: manicureImage,
  Facial: facialImage,
};

const services = [
  {
    name: 'Haircut',
    description: 'A stylish haircut tailored to your needs.',
    time: '45 minutes',
    price: '$25',
    image: images.Haircut,
  },
  {
    name: 'Massage',
    description: 'Relaxing full-body massage to ease tension.',
    time: '60 minutes',
    price: '$60',
    image: images.Massage,
  },
  {
    name: 'Manicure',
    description: 'Professional nail care and polish.',
    time: '30 minutes',
    price: '$20',
    image: images.Manicure,
  },
  {
    name: 'Facial',
    description: 'Revitalize your skin with a refreshing facial.',
    time: '50 minutes',
    price: '$40',
    image: images.Facial,
  },
];

const AvailableServices = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      {/* Header with white background and subtle shadow */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Available Services
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Services Container */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        {services.map((service) => (
          <Box
            key={service.name}
            sx={{
              backgroundColor: '#ffffff',
              color: '#000000',
              flex: 1,
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern effect
              textAlign: 'center',
              minWidth: '250px', // Minimum width for responsive layout
              maxWidth: '400px', // Max width for service boxes
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              {service.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px', color: '#555' }}>
              {service.description}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px', color: '#777' }}>
              Expected Time: {service.time}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '20px', color: '#777' }}>
              Price: {service.price}
            </Typography>
            <Box
              sx={{
                backgroundColor: '#e0e0e0',
                width: '100%',
                height: '200px',
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Menu for navigation */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/customer/home')}>Customer Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/customer/calendar')}>Customer Calendar</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

export default AvailableServices;
