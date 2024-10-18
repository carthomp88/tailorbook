import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Import hamburger menu icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import haircutImage from './haircut.jpg';
import massageImage from './massage.jpg';

const images = {
  Haircut: haircutImage,
  Massage: massageImage,
};

const CustomerHome = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor

  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null); // Clear the anchor element to close the menu
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    handleMenuClose(); // Close the menu after navigation
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '100px' }}> {/* Light background and space for the bottom bar */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}> {/* Clean white AppBar */}
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}> {/* Black bold text */}
            Customer Home
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} /> {/* Black hamburger menu icon */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main container for layout */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px' }}>
        {/* Left vertical rectangle for pictures */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '300px',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '50px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern effect
          borderRadius: '10px', // Rounded corners
        }}>
          <img src={images.Haircut} alt="Service 1" style={{ maxWidth: '100%', maxHeight: '100%', height: '400px', borderRadius: '10px' }} /> {/* Rounded corners for images */}
        </Box>

        {/* Middle large vertical rectangle for available services */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '400px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '50px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern effect
          borderRadius: '10px', // Rounded corners
          padding: '20px', // Padding inside the box
        }}>
          <Typography variant="h2" sx={{ color: '#000000', fontWeight: 'bold' }}>Gabe's Spa & Salon</Typography>
          <Typography variant="h5" sx={{ color: '#555555' }}>Welcome to Gabe's Spa & Salon!</Typography>
          <Typography variant="h5" sx={{ color: '#555555' }}>Your oasis for relaxation and beauty</Typography>
          <Typography variant="h5" sx={{ color: '#555555' }}>Hours: M-S: 9-5 | Sundays: Closed</Typography>
        </Box>

        {/* Right vertical rectangle for pictures */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '300px',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '50px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern effect
          borderRadius: '10px', // Rounded corners
        }}>
          <img src={images.Massage} alt="Service 2" style={{ maxWidth: '100%', maxHeight: '100%', height: '400px', borderRadius: '10px' }} /> {/* Rounded corners for images */}
        </Box>
      </Box>

       {/* Fixed bottom bar for contact information */}
       <Box sx={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space out text boxes
        position: 'fixed', // Fixed at the bottom
        bottom: '0', // Stick to the bottom of the viewport
        padding: '0 20px', // Add padding to the sides
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow at the bottom
      }}>
        <Typography sx={{ color: '#555555', width: '30%', textAlign: 'right' }}>Email: example@business.com</Typography>
        <Typography sx={{ color: '#555555', width: '30%', textAlign: 'center' }}>Phone Number: (123) 456-7890</Typography>
        <Typography sx={{ color: '#555555', width: '30%', textAlign: 'left' }}>Social Media: @businessname</Typography>
      </Box>
      {/* Hamburger menu for navigation */}
      <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={Boolean(anchorEl)} // Open state of the menu
        onClose={handleMenuClose} // Close the menu
      >
        <MenuItem onClick={() => handleNavigation('/customer/calendar')}>Customer Calendar</MenuItem> {/* Navigate to Customer Calendar */}
        <MenuItem onClick={() => handleNavigation('/customer/services')}>Available Services</MenuItem> {/* Navigate to Available Services */}
        <MenuItem onClick={handleMenuClose}>Close</MenuItem> {/* Close the menu */}
      </Menu>
    </Box>
  );
};

export default CustomerHome; // Export the component for use in other files
