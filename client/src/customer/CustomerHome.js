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
    <Box sx={{ backgroundColor: 'black', height: '100vh' }}> {/* Set the background color to black */}
      <AppBar position="static" sx={{ backgroundColor: 'blue' }}> {/* Header background color */}
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}> {/* Header text color */}
            Customer Home
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon /> {/* Hamburger menu icon */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main container for layout */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px' }}>
        {/* Left vertical rectangle for pictures only */}
        <Box sx={{
          backgroundColor: 'red',
          width: '300px',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '50px',
        }}>
         <img src={images.Haircut} alt="Service 2" style={{ maxWidth: '100%', maxHeight: '100%', height: '400px', }} /> {/* Insert picture here */}
        </Box>

        {/* Middle large vertical rectangle for available services */}
        <Box sx={{
          backgroundColor: 'red',
          width: '400px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '50px',
        }}>
          <Typography variant = "h2" sx={{ color: 'white' }}>Gabe's Spa & Salon</Typography>
          <Typography variant = "h5" sx={{ color: 'white' }}>Welcome to Gabe's Spa & Salon!</Typography>
          <Typography variant = "h5" sx={{ color: 'white' }}>Your oasis for relaxation and beauty</Typography>
          <Typography variant = "h5" sx={{ color: 'white' }}>Hours : M-S : 9-5     Sundays: Closed</Typography>
        </Box>

        {/* Right vertical rectangle for pictures only */}
        <Box sx={{
          backgroundColor: 'red',
          width: '300px',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '50px',
        }}>
          <img src={images.Massage} alt="Service 2" style={{ maxWidth: '100%', maxHeight: '100%', height: '400px', }} /> {/* Insert picture here */}
        </Box>
      </Box>

      {/* Bottom horizontal rectangle with non-editable text */}
      <Box sx={{
        backgroundColor: 'red',
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space out text boxes
        position: 'absolute',
        bottom: '0',
        padding: '0 20px', // Add some padding to the sides
      }}>
        <Typography sx={{ color: 'white', width: '30%', textAlign: 'right' }}>Email: example@business.com</Typography>
        <Typography sx={{ color: 'white', width: '30%', textAlign: 'center' }}>Phone Number: (123) 456-7890</Typography>
        <Typography sx={{ color: 'white', width: '30%', textAlign: 'left' }}>Social Media: @businessname</Typography>
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
