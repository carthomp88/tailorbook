import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Import hamburger menu icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'; // Import moment for date handling
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles

// Initialize the localizer with the moment adapter for date management
const localizer = momentLocalizer(moment);

const OwnerCalendar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor

  // Define a function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    handleMenuClose(); // Close the menu after navigation
  };

  // State to hold events for the calendar
  const [events] = useState([
    // Example events (replace with your actual events)
    {
      title: 'Sample Event', // Title of the event
      start: new Date(), // Start date of the event
      end: new Date(moment().add(1, 'hours')), // End date of the event
    },
  ]);

  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null); // Clear the anchor element to close the menu
  };

  return (
    <Box sx={{ backgroundColor: 'black', height: '100vh' }}> {/* Set the background color to black */}
      <AppBar position="static" sx={{ backgroundColor: 'purple' }}> {/* Header background color */}
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}> {/* Increased title size */}
            Owner Calendar
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon /> {/* Hamburger menu icon */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main container for the calendar and buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Calendar container */}
        <Box sx={{ 
          position: 'relative', 
          bottom: '-160px', // Adjusts the position of the calendar box
          left: '-10px', // Adjusts the position of the calendar box
          width: '1200px', // Set width of the calendar box
          height: '700px', // Set height of the calendar box
          overflow: 'hidden', // Hides overflow content
          border: '1px solid #ccc', // Border styling for the calendar box
          backgroundColor: '#fff', // Background color for the calendar box
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)', // Adds shadow effect to the box
        }}>
          {/* React Big Calendar component */}
          <Calendar
            localizer={localizer} // Date localizer
            events={events} // Pass events to the calendar
            startAccessor="start" // Accessor for the event start time
            endAccessor="end" // Accessor for the event end time
            style={{ height: '100%', width: '100%' }} // Set height and width of the calendar
          />
        </Box>

        {/* Buttons on the right side of the calendar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Large buttons for additional actions */}
          <Button variant="contained" sx={{ backgroundColor: 'purple', fontSize: '25px', padding: '48px 60px ', marginTop: '50px' }}>
            Manage Schedule
          </Button>
          <Button variant="contained" sx={{ backgroundColor: 'purple', fontSize: '25px', padding: '48px 60px ', marginBottom: '10px', marginTop: '10px' }}>
            Manage Services
          </Button>
          <Button variant="contained" sx={{ backgroundColor: 'purple', fontSize: '25px', padding: '48px 60px ', marginBottom: '-50px'}}>
            Manage Appearance
          </Button>
        </Box>
      </Box>

      {/* Hamburger menu for navigation */}
      <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={Boolean(anchorEl)} // Open state of the menu
        onClose={handleMenuClose} // Close the menu
      >
        <MenuItem onClick={() => handleNavigation('/owner/services')}>Owner Services</MenuItem> {/* Navigate to Owner Page 1 */}
        <MenuItem onClick={() => handleNavigation('/owner/home')}>Owner Home</MenuItem> {/* Navigate to Owner Page 2 */}
        <MenuItem onClick={handleMenuClose}>Close</MenuItem> {/* Close the menu */}
      </Menu>
    </Box>
  );
};

export default OwnerCalendar; // Export the component for use in other files
