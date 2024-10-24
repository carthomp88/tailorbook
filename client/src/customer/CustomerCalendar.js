// Import necessary libraries and components.
import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Select, Toolbar, Typography, TextField } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

// Grab calendar data way up here
const res = await axios.get('http://localhost:8080/customer/calendar');

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

// Create a localizer for the calendar using moment.js, which will handle date parsing and formatting.
const localizer = momentLocalizer(moment);

// Define the main functional component for the Customer Calendar page.
const CustomerCalendar = () => {
  const navigate = useNavigate(); // Hook to manage navigation between different routes/pages.

  const [anchorEl, setAnchorEl] = useState(null); // State variable to manage the anchor element for the dropdown menu.
  const [selectedService, setSelectedService] = useState(''); // State variable to store the selected service from the dropdown.
  const [selectedDate, setSelectedDate] = useState(null); // State variable to store the selected date from the calendar.
  const [selectedTime, setSelectedTime] = useState(''); // State variable to store the selected time for the appointment.
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false); // State to manage checkout popup visibility.

  // New state variables for customer contact info and credit card details
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  // Object defining available services based on specific dates.
  const serviceAvailability = {
    '2024-10-30': ['Haircut', 'Massage', 'Facial'],
    '2024-10-31': ['Haircut', 'Manicure'],
    '2024-11-01': ['Pedicure', 'Massage', 'Facial'],
    '2024-11-02': ['Facial', 'Pedicure', 'Manicure'],
    '2024-11-03': ['Haircut', 'Massage'],
  };

  // Sample appointment data for testing unavailable slots next week
  const sampleAppointments = [
    { date: '2024-10-30T10:00:00' }, // October 30th, 10 AM
    { date: '2024-10-31T13:00:00' }, // October 31st, 1 PM
    { date: '2024-11-01T09:00:00' }, // November 1st, 9 AM
    { date: '2024-11-02T14:00:00' }, // November 2nd, 2 PM
    { date: '2024-11-03T16:00:00' }, // November 3rd, 4 PM
  ];

  const appointments = [];

  const appointmentData = res.data.array

  sampleAppointments.forEach(aptmt => {
    const date = new Date(aptmt.date);
    appointments.push({ title: 'Unavailable', start: new Date(date), end: new Date(moment(date).add(1, 'hours')) });
  })

  // Populate events with calendar data from server
  appointmentData.forEach((obj) => {
    const date = new Date(obj.date);
    appointments.push({ title: 'Unavailable', start: new Date(date), end: new Date(moment(date).add(1, 'hours')) });
  });

  const [events] = useState(appointments);

  // Handle date selection on the calendar.
  const handleDateSelect = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format('YYYY-MM-DD'); // Format the selected date.
    setSelectedDate(selectedDate); // Update the state with the selected date.
    setSelectedService(''); // Reset selected service when the date changes.
    setSelectedTime(''); // Reset selected time when the date changes.
  };

  // Get available services for the selected date.
  const availableServices = selectedDate && serviceAvailability[selectedDate] ? serviceAvailability[selectedDate] : [];

  // Handle service selection in the dropdown.
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value); // Update selected service.
  };

  const handleFormSend = () => {
    const data = {
      date: new Date('' + selectedDate + 'T' + selectedTime),
      firstName: customerFirstName,
      lastName: customerLastName,
      email: customerEmail,
      phonenum: customerPhone,
      type: selectedService
    }
    postData("http://localhost:8080/customer/book", data)
    handleCheckoutClose()
  }

  // Handle time selection based on the selected service and date
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value); // Update selected time.
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

  // Handle the booking button click to show checkout popup.
  const handleBooking = () => {
    setShowCheckoutPopup(true); // Show the checkout popup.
  };

  // Handle checkout popup close action.
  const handleCheckoutClose = () => {
    setShowCheckoutPopup(false); // Hide the checkout popup.
    // Clear the form fields when closing the popup
    setCustomerFirstName('');
    setCustomerLastName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCardNumber('');
    setCardExpiration('');
    setCardCVC('');
    setSelectedService('');
    setSelectedTime('');
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

          {/* Time selection input placed above the Book Appointment button */}
          <TextField
            type="time" // Input for selecting appointment time.
            value={selectedTime}
            onChange={handleTimeChange}
            variant="outlined"
            sx={{
              marginBottom: '300px',
              width: '400px',
              fontSize: '24px',
            }}
            disabled={!selectedService} // Disable if no service selected.
          />
        </Box>
      </Box>

      {/* Booking button */}
      <Button
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: '50px',
          right: '50px',
          backgroundColor: '#007bff',
          color: '#fff',
          '&:hover': { backgroundColor: '#0056b3' },
          padding: '30px 43px', // Increase padding
          fontSize: '30px', // Increase font size
        }}
        disabled={!selectedService || !selectedDate || !selectedTime} // Disable if conditions are not met.
        onClick={handleBooking} // Handle booking button click.
      >
        Book Appointment
      </Button>

      {/* Checkout popup */}
      {showCheckoutPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '900px', // Increased width for the popup
            height: '700px', // Increased height for the popup
            borderRadius: '8px',
            padding: '40px',
            zIndex: 1000,
            overflow: 'auto', // Added to handle overflow of content if necessary
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Booking Confirmation
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Service: {selectedService}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Date: {selectedDate}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Time: {selectedTime}
          </Typography>

          {/* Customer contact info fields */}
          <TextField
            label="First Name"
            value={customerFirstName}
            onChange={(e) => setCustomerFirstName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={customerLastName}
            onChange={(e) => setCustomerLastName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />

          {/* Credit Card info fields */}
          <TextField
            label="Credit Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiration Date (MM/YY)"
            value={cardExpiration}
            onChange={(e) => setCardExpiration(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="CVC"
            value={cardCVC}
            onChange={(e) => setCardCVC(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <Typography variant="h6" sx={{ marginBottom: '20px', marginTop: '20px' }}>
            Thank you for your booking!
          </Typography>
          <Button variant="contained" onClick={handleFormSend}>
            Submit and Book
          </Button>
          <Button variant="contained" onClick={handleCheckoutClose}>
            Cancel
          </Button>
        </Box>
      )}

     {/* Hamburger menu for navigation */}
     <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={Boolean(anchorEl)} // Open state of the menu
        onClose={handleMenuClose} // Close the menu
      >
        <MenuItem onClick={() => handleNavigation('/customer/home')}>Customer Calendar</MenuItem> {/* Navigate to Customer Calendar */}
        <MenuItem onClick={() => handleNavigation('/customer/services')}>Available Services</MenuItem> {/* Navigate to Available Services */}
        <MenuItem onClick={handleMenuClose}>Close</MenuItem> {/* Close the menu */}
      </Menu>
    </Box>
  );
};

// Export the component for use in other parts of the app.
export default CustomerCalendar;
