// Import necessary libraries and components.
import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'

// Grab calendar data way up here
const res = await axios.get('http://localhost:8080/customer/calendar')

// Create a localizer for the calendar using moment.js, which will handle date parsing and formatting.
const localizer = momentLocalizer(moment);

// Define the main functional component for the Customer Calendar page.
const CustomerCalendar = () => {
  const navigate = useNavigate(); // Hook to manage navigation between different routes/pages.

  const [anchorEl, setAnchorEl] = useState(null); // State variable to manage the anchor element for the dropdown menu.
  const [selectedService, setSelectedService] = useState(''); // State variable to store the selected service from the dropdown.
  const [selectedDate, setSelectedDate] = useState(null); // State variable to store the selected date from the calendar.

  // Object defining available services based on specific dates.
  const serviceAvailability = {
    '2024-10-10': ['Haircut', 'Massage'],
    '2024-10-11': ['Haircut', 'Manicure'],
    '2024-10-12': ['Facial', 'Pedicure', 'Massage'],
  };
 
  // Populate events with calendar data from server
  const appointmentData = res.data.array
  
  const appointments = []
  appointmentData.forEach((obj) => {
    const date = new Date(obj.date)
    appointments.push({title: 'Unavailable', start: new Date(date), end: new Date(moment(date).add(1, 'hours')) })
  })
  const [events] = useState(appointments);

  // Handle date selection on the calendar.
  const handleDateSelect = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format('YYYY-MM-DD'); // Format the selected date.
    setSelectedDate(selectedDate); // Update the state with the selected date.
    setSelectedService(''); // Reset selected service when the date changes.
  };

  // Get available services for the selected date.
  const availableServices = selectedDate && serviceAvailability[selectedDate] ? serviceAvailability[selectedDate] : [];

  // Handle service selection in the dropdown.
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value); // Update selected service.
  };

  // Handle the opening of the hamburger menu.
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle the closing of the hamburger menu.
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigate to a specific page.
  const handleNavigation = (path) => {
    navigate(path); // Use the navigate function to move to a different route.
    handleMenuClose(); // Close the menu after navigating.
  };

  // Return the main JSX structure.
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', height: '100vh', padding: '20px' }}>
      {/* AppBar with page title and menu button */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Customer Calendar
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Instructional message */}
      <Box sx={{ backgroundColor: 'white', color: 'black', padding: '10px', textAlign: 'center', marginTop: '10px' }}>
        Select a date to see available services
      </Box>

      {/* Layout container with calendar on the left and service dropdown on the right */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Calendar section */}
        <Box
          sx={{
            width: '70%',
            height: '800px',
            overflow: 'hidden',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <Calendar
            localizer={localizer} // Moment.js localizer for dates.
            events={events} // Example events.
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%', width: '100%' }}
            selectable // Enable date selection.
            onSelectSlot={handleDateSelect} // Handle date selection.
          />
        </Box>

        {/* Service dropdown section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Select
            value={selectedService} // Currently selected service.
            onChange={handleServiceChange} // Handle service selection.
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              width: '400px',
              height: '100px',
              marginTop: '50px',
              fontSize: '24px',
              padding: '10px',
            }}
            disabled={!selectedDate} // Disable if no date selected.
          >
            <MenuItem value="" disabled>
              {selectedDate ? 'Select a Service' : 'Select a Date First'}
            </MenuItem>

            {/* Render available services in the dropdown */}
            {availableServices.map((service) => (
              <MenuItem key={service} value={service} sx={{ fontSize: '24px' }}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Booking button */}
      <Button
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'blue',
          color: 'white',
          padding: '30px 60px',
          fontSize: '32px',
        }}
        disabled={!selectedService} // Disable if no service selected.
      >
        Book Now
      </Button>

      {/* Navigation menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/customer/home')}>Customer Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/customer/services')}>Customer Services</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomerCalendar;
