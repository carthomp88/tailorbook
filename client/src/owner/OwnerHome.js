import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Import hamburger menu icon
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar CSS

const localizer = momentLocalizer(moment);

const res = await axios.get('http://localhost:8080/owner/calendar')

const OwnerHome = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // State for managing hamburger menu visibility
  const [selectedDate, setSelectedDate] = useState(moment().toDate()); // Default to today's date

  // Example appointment data (replace with actual data source)
  const appointments = [];

  const appointmentData = res.data.array

  appointmentData.forEach((obj) => {
    const date = new Date(obj.date)
    appointments.push({
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(), 
      client: obj.user.firstName + ' ' + obj.user.lastName, 
      start: new Date(date), 
      end: new Date(moment(date).add(1, 'hours')),
      notes: obj.notes === undefined ? 'No notes provided' : obj.notes,
      type: obj.type
    })
  })

  const [events] = useState(appointments)

  // Filter appointments to only show those for the selected date
  const filteredAppointments = appointments.filter(appointment =>
    moment(appointment.date).isSame(selectedDate, 'day')
  );

  // Open and close hamburger menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Handle date selection on the calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Set selected date for viewing appointments
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* AppBar with Logo and Title */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {/* Business Logo */}
          <Box component="img" src="/path/to/logo.png" alt="Business Logo" sx={{ height: '50px', marginRight: '20px' }} />
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Owner Dashboard
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Layout with Calendar and Today's Appointments */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        {/* Calendar Component */}
        <Box sx={{ width: '80%', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden' }}>
          <Calendar
            localizer={localizer}
            events={[events]} // Add real events data here if available
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            selectable
            onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
          />
        </Box>

        {/* Today's Appointments List */}
        <Box sx={{ width: '80%', backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5" sx={{ marginBottom: '10px' }}>Appointments for {moment(selectedDate).format('MMMM Do YYYY')}</Typography>
          <List>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemText
                    primary={`${appointment.time} - ${appointment.client}`}
                    secondary={`${appointment.type}: ${appointment.notes}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">No appointments for this date.</Typography>
            )}
          </List>
        </Box>
      </Box>

      {/* Hamburger Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => navigate('/owner/services')}>Manage Services</MenuItem>
        <MenuItem onClick={() => navigate('/owner/calendar')}>View Calendar</MenuItem>
        <MenuItem onClick={() => navigate('/owner/site-settings')}>Site Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

export default OwnerHome;
