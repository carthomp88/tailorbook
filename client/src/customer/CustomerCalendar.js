import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Select, Toolbar, Typography, TextField } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import postData from '../components/functions.js';

const calendarData = await axios.get('http://localhost:8080/customer/calendar');
const serviceData = await axios.get('http://localhost:8080/owner/services')

const localizer = momentLocalizer(moment);

const CustomerCalendar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('');
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  

  // this hook gets the user from local storage to put their data in the form automatically
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCustomerEmail(foundUser.email)
      setCustomerFirstName(foundUser.firstName)
      setCustomerLastName(foundUser.lastName)
      setCustomerPhone(foundUser.phone)
    }
  }, []);

  const [availableServices, setAvailableServices] = useState([])

  const appointments = [];

  // Load appointments from calendar data and add sample data for unavailable slots
  calendarData.data.array.forEach((obj) => {
    const date = new Date(obj.date);
    appointments.push({ title: 'Unavailable', start: date, end: new Date(moment(date).add(1, 'hours')) });
  });

  const services = serviceData.data.array

  const [events] = useState(appointments);

  const handleDateSelect = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format('YYYY-MM-DD');
    setSelectedDate(selectedDate);
    setSelectedService('');
    setSelectedTime('');
    handleAvailableServices(selectedDate);
  };

  const handleAvailableServices = (date) => {
    const dow = moment(date).day()
    const availableServicesOnDate = []
    services.forEach(service => {
      if (service.daysOffered.includes(dow)) availableServicesOnDate.push(service.name);
      setAvailableServices(availableServicesOnDate)
    })
  }

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

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

  const handleBooking = () => {
    setShowCheckoutPopup(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckoutPopup(false);
    setCustomerFirstName('');
    setCustomerLastName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setSelectedService('');
    setSelectedTime('');
  };

  const handleFormSend = () => {
    const data = {
      date: new Date(`${selectedDate}T${selectedTime}`),
      firstName: customerFirstName,
      lastName: customerLastName,
      email: customerEmail,
      phonenum: customerPhone,
      type: selectedService,
      notes: notes,
    };
    postData('http://localhost:8080/customer/book', data);
    handleCheckoutClose();
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', height: '100vh', padding: '20px' }}>
      {/* AppBar */}
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

      {/* Selected Date */}
      <Box sx={{ backgroundColor: 'white', color: 'black', padding: '10px', textAlign: 'center', marginTop: '10px' }}>
        Selected Date: {moment(selectedDate).format('MMMM Do YYYY')}
      </Box>

      {/* Calendar and selection fields */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Calendar */}
        <Box
          sx={{
            width: '70%',
            height: '800px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%', width: '100%' }}
            selectable
            onSelectSlot={handleDateSelect}
            onClick={handleDateSelect}
          />
        </Box>

        {/* Service and Time selection */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '25%', gap: 2 }}>
          <Select
            value={selectedService}
            onChange={handleServiceChange}
            variant="outlined"
            sx={{ backgroundColor: 'white', width: '100%', height: '50px', marginTop: '50px', fontSize: '18px' }}
            disabled={!selectedDate}
          >
            <MenuItem value="" disabled>
              {selectedDate ? 'Select a Service' : 'Select a Date First'}
            </MenuItem>
            {availableServices.map((service, index) => (
              <MenuItem key={index} value={service}>{service}</MenuItem>
            ))}
          </Select>

          <TextField
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            variant="outlined"
            sx={{ width: '100%', fontSize: '18px' }}
            disabled={!selectedService}
          />
        </Box>
      </Box>

      {/* Book Appointment Button */}
      <Button
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: '50px',
          right: '50px',
          backgroundColor: '#007bff',
          color: '#fff',
          fontSize: '20px',
          padding: '20px 30px',
        }}
        disabled={!selectedService || !selectedDate || !selectedTime}
        onClick={handleBooking}
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
            width: '400px',
            borderRadius: '8px',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Confirm Booking
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Service: {selectedService}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Date: {moment(selectedDate).format('MMMM Do YYYY')}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Time: {selectedTime}
          </Typography>
          {/* Input fields for customer info */}
          <TextField label="First Name" value={customerFirstName} onChange={(e) => setCustomerFirstName(e.target.value)} fullWidth margin="normal" />
          <TextField label="Last Name" value={customerLastName} onChange={(e) => setCustomerLastName(e.target.value)} fullWidth margin="normal" />
          <TextField label="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} fullWidth margin="normal" />
          <TextField label="Phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} fullWidth margin="normal" />
          <TextField label="Additional Notes" value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth margin="normal" />
          
          <Button variant="contained" onClick={handleFormSend} sx={{ marginTop: '20px' }}>
            Confirm Booking
          </Button>
          <Button variant="outlined" onClick={handleCheckoutClose} sx={{ marginTop: '10px' }}>
            Cancel
          </Button>
        </Box>
      )}

      {/* Hamburger menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleNavigation('/customer/home')}>Customer Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/customer/services')}>Available Services</MenuItem>
        <MenuItem onClick={() => {localStorage.clear(); navigate('/')}}>Log Out</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomerCalendar;
