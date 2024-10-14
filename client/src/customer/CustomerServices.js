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
    <Box sx={{ backgroundColor: 'black', height: '100vh', padding: '20px' }}>
      {/* Header with blue background */}
      <AppBar position="static" sx={{ backgroundColor: 'blue' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
            Available Services
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Services Container */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
        {services.map((service) => (
          <Box
            key={service.name}
            sx={{
              backgroundColor: 'red',
              color: 'white',
              flex: 1,
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
              {service.name}
            </Typography>
            <hr style={{ borderColor: 'white', margin: '20px 0' }} />
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              {service.description}
            </Typography>
            <hr style={{ borderColor: 'white', margin: '20px 0' }} />
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Expected Time: {service.time}
            </Typography>
            <hr style={{ borderColor: 'white', margin: '20px 0' }} />
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Price: {service.price}
            </Typography>
            <hr style={{ borderColor: 'white', margin: '20px 0' }} />
            <Box
              sx={{
                backgroundColor: 'grey',
                width: '100%',
                height: '450px',
                marginTop: '40px',
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
              }}
            >
              {/* Placeholder for image */}
            </Box>
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
