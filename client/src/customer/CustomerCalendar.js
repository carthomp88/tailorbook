// Import necessary libraries and components.
import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Create a localizer for the calendar using moment.js, which will handle date parsing and formatting.
const localizer = momentLocalizer(moment);

// Define the main functional component for the Customer Calendar page.
const CustomerCalendar = () => {
  // Hook to manage navigation between different routes/pages.
  const navigate = useNavigate();

  // State variable to manage the anchor element for the dropdown menu (used for the hamburger menu).
  const [anchorEl, setAnchorEl] = useState(null);

  // State variable to store the currently selected service from the dropdown menu.
  const [selectedService, setSelectedService] = useState('');

  // State variable to store the selected date from the calendar.
  const [selectedDate, setSelectedDate] = useState(null);

  // Object defining available services based on specific dates.
  // Each key represents a date, and the value is an array of services available on that date.
  const serviceAvailability = {
    '2024-10-10': ['Haircut', 'Massage'],
    '2024-10-11': ['Haircut', 'Manicure'],
    '2024-10-12': ['Facial', 'Pedicure', 'Massage'],
  };

  // Define initial events for the calendar. In this case, a dummy event is provided for display purposes.
  const [events] = useState([
    {
      title: 'Sample Service', // Title of the event displayed on the calendar.
      start: new Date(), // Start time of the event.
      end: new Date(moment().add(1, 'hours')), // End time of the event, set to one hour after the start.
    },
  ]);

  // Function to handle when a date is selected on the calendar.
  // This function will update the selectedDate state and reset the selected service.
  const handleDateSelect = (slotInfo) => {
    // Format the selected date to 'YYYY-MM-DD' using moment.js for consistency.
    const selectedDate = moment(slotInfo.start).format('YYYY-MM-DD');

    // Update the state to store the selected date.
    setSelectedDate(selectedDate);

    // Clear previously selected service when the date changes.
    setSelectedService('');
  };

  // Determine the available services for the currently selected date.
  // If a date is selected and it exists in the serviceAvailability object, return the list of services for that date.
  // Otherwise, return an empty array.
  const availableServices = selectedDate && serviceAvailability[selectedDate] ? serviceAvailability[selectedDate] : [];

  // Function to handle the change in the selected service when the user selects a new option from the dropdown.
  const handleServiceChange = (event) => {
    // Update the state to store the newly selected service.
    setSelectedService(event.target.value);
  };

  // Function to open the dropdown menu (triggered by the hamburger icon).
  // The event provides the element to which the menu should be anchored.
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the dropdown menu.
  const handleMenuClose = () => {
    // Clear the anchor element to indicate that the menu should be closed.
    setAnchorEl(null);
  };

  // Function to handle navigation to a different page when a menu item is clicked.
  const handleNavigation = (path) => {
    // Use the navigate function to go to the specified path.
    navigate(path);

    // Close the menu after navigating.
    handleMenuClose();
  };

  // Return the JSX structure for rendering the Customer Calendar component.
  return (
    // Main container for the component. Uses Material-UI's Box component for layout.
    <Box sx={{ backgroundColor: 'black', height: '100vh' }}>
      {/* AppBar component to display the page header with the title and hamburger menu. */}
      <AppBar position="static" sx={{ backgroundColor: 'blue' }}>
        <Toolbar>
          {/* Centered title for the Customer Calendar. */}
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
            Customer Calendar
          </Typography>

          {/* IconButton to open the menu. Uses the MenuIcon from MUI. */}
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Text box displaying instructions for the user, asking them to select a date to view available services. */}
      <Box sx={{ backgroundColor: 'white', color: 'black', padding: '10px', textAlign: 'center', marginTop: '10px' }}>
        Select a date to see available services
      </Box>

      {/* Main layout container with the calendar on the left and service selection on the right. */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Container for the calendar component. Sets dimensions and styling. */}
        <Box sx={{ 
          width: '70%', 
          height: '800px', 
          overflow: 'hidden', 
          border: '1px solid #ccc', 
          backgroundColor: '#fff', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>
          <Calendar
            localizer={localizer} // Set up the calendar's date localization using the moment.js localizer.
            events={events} // Pass in the events to be displayed on the calendar.
            startAccessor="start" // Specify the start time field for events.
            endAccessor="end" // Specify the end time field for events.
            style={{ height: '100%', width: '100%' }} // Set the size of the calendar.
            selectable // Enable date selection on the calendar.
            onSelectSlot={handleDateSelect} // Attach the function that handles date selection.
          />
        </Box>

        {/* Service selection dropdown container. Aligns the dropdown vertically with space between elements. */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Select
            value={selectedService} // Set the currently selected value.
            onChange={handleServiceChange} // Attach the function to handle changes to the selected service.
            variant="outlined" // Use an outlined style for the dropdown.
            sx={{ 
              backgroundColor: 'white', 
              width: '400px', 
              height: '100px', 
              marginTop: '50px', 
              fontSize: '24px', 
              padding: '10px',
            }}
            disabled={!selectedDate} // Disable the dropdown if no date has been selected yet.
          >
            {/* Placeholder text shown when no service is selected. Changes based on whether a date is selected. */}
            <MenuItem value="" disabled>
              {selectedDate ? 'Select a Service' : 'Select a Date First'}
            </MenuItem>

            {/* Map over the available services and render each as a menu item in the dropdown. */}
            {availableServices.map((service) => (
              <MenuItem key={service} value={service} sx={{ fontSize: '24px' }}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Button for booking the selected service. Only enabled if a service has been selected. */}
      <Button
        variant="contained"
        sx={{
          position: 'fixed', // Fix the button position at the bottom-right corner of the screen.
          bottom: '20px',
          right: '20px',
          backgroundColor: 'blue',
          color: 'white',
          padding: '30px 60px', // Increase padding for a larger button size.
          fontSize: '32px', // Increase font size for better visibility.
        }}
        disabled={!selectedService} // Disable the button if no service is selected.
      >
        Book Now
      </Button>

      {/* Menu component for navigation options. Triggered by the hamburger icon. */}
      <Menu
        anchorEl={anchorEl} // Anchor the menu to the element that triggered it.
        open={Boolean(anchorEl)} // Open the menu if the anchor element exists.
        onClose={handleMenuClose} // Attach the function to close the menu.
      >
        {/* Each menu item navigates to a different page. */}
        <MenuItem onClick={() => handleNavigation('/customer/home')}>Customer Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/customer/services')}>Customer Services</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

// Export the component for use in other parts of the application.
export default CustomerCalendar;
