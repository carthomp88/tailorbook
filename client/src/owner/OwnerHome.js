import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Import hamburger menu icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const OwnerHome = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor

  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null); // Clear the anchor element to close the menu
  };

  // Define a function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    handleMenuClose(); // Close the menu after navigation
  };

  return (
    <Box sx={{ backgroundColor: 'black', height: '100vh' }}> {/* Set the background color to black */}
      <AppBar position="static" sx={{ backgroundColor: 'purple' }}> {/* Header background color */}
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}> {/* Header text color */}
            Owner Home
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon /> {/* Hamburger menu icon */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main container for layout */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px' }}>
        {/* Left vertical rectangle */}
        <Box sx={{
          backgroundColor: 'purple',
          width: '200px',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '200px',
          marginTop: '100px',
        }}>
          <TextField variant="outlined" placeholder="Insert Picture" sx={{ width: '80%', backgroundColor: 'white' }} />
        </Box>

        {/* Middle large vertical rectangle */}
        <Box sx={{
          backgroundColor: 'purple',
          width: '400px',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '10px',
          marginTop: '100px',
        }}>
          <TextField variant="outlined" placeholder="Edit Business Name" sx={{ width: '80%', backgroundColor: 'white' }} />
          <TextField variant="outlined" placeholder="Edit Business Info" sx={{ width: '80%', backgroundColor: 'white' }} />
          <TextField variant="outlined" placeholder="Edit Business Hours" sx={{ width: '80%', backgroundColor: 'white' }} />
        </Box>

        {/* Right vertical rectangle */}
        <Box sx={{
          backgroundColor: 'purple',
          width: '200px',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '200px',
          marginTop: '100px',
        }}>
          <TextField variant="outlined" placeholder="Insert Picture" sx={{ width: '80%', backgroundColor: 'white' }} />
        </Box>
      </Box>

      {/* Bottom horizontal rectangle */}
      <Box sx={{
        backgroundColor: 'purple',
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around', // Space out text boxes evenly
        position: 'absolute',
        bottom: '0',
      }}>
        <TextField variant="outlined" placeholder="Insert Email" sx={{ width: '30%', backgroundColor: 'white' }} />
        <TextField variant="outlined" placeholder="Insert Phone Number" sx={{ width: '30%', backgroundColor: 'white' }} />
        <TextField variant="outlined" placeholder="Insert Social Media" sx={{ width: '30%', backgroundColor: 'white' }} />
      </Box>

      {/* Hamburger menu for navigation */}
      <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={Boolean(anchorEl)} // Open state of the menu
        onClose={handleMenuClose} // Close the menu
      >
        <MenuItem onClick={() => handleNavigation('/owner/calendar')}>Owner Calendar</MenuItem> {/* Navigate to Owner Page 1 */}
        <MenuItem onClick={() => handleNavigation('/owner/services')}>Owner Services</MenuItem> {/* Navigate to Owner Page 2 */}
        <MenuItem onClick={handleMenuClose}>Close</MenuItem> {/* Close the menu */}
      </Menu>
    </Box>
  );
};

export default OwnerHome; // Export the component for use in other files
