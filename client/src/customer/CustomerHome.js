import React, { useState } from 'react';
import { AppBar, Box, Button, Card, CardContent, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Import hamburger menu icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import haircutImage from './haircut.jpg';
import massageImage from './massage.jpg';
import axios from 'axios';

// Fetch landing data from server
const landingData = await axios.get('http://localhost:8080/landing');

const images = {
  Haircut: haircutImage,
  Massage: massageImage,
};

const hours = landingData.data.hours

const CustomerHome = () => {
  const name = landingData.data.name
  const info = landingData.data.info
  const email = landingData.data.email
  const phone = landingData.data.phone
  const social = landingData.data.social

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const [displayHours] = useState([
    hours.sunday.name + ': ' + (hours.sunday.open === 'Closed'?'Closed':(hours.sunday.open + '-' + hours.sunday.close)),
    hours.monday.name + ': ' + (hours.monday.open === 'Closed'?'Closed':(hours.monday.open +  '-' + hours.monday.close)),
    hours.tuesday.name + ': ' + (hours.tuesday.open === 'Closed'?'Closed':(hours.tuesday.open +  '-' + hours.tuesday.close)),
    hours.wednesday.name + ': ' + (hours.wednesday.open === 'Closed'?'Closed':(hours.wednesday.open +  '-' + hours.wednesday.close)),
    hours.thursday.name + ': ' + (hours.thursday.open === 'Closed'?'Closed':(hours.thursday.open +  '-' + hours.thursday.close)),
    hours.friday.name + ': ' + (hours.friday.open === 'Closed'?'Closed':(hours.friday.open +  '-' + hours.friday.close)),
    hours.saturday.name + ': ' + (hours.saturday.open === 'Closed'?'Closed':(hours.saturday.open +  '-' + hours.saturday.close)),
  ])
  const hoursObj = {hours: ''}
  displayHours.forEach((day) => hoursObj.hours += day)

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
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Fixed AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd', boxShadow: '0px 2px 8px rgba(0,0,0,0.05)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#333' }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: '#333' }}>
            Welcome to {name}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered Company Name */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '90px', paddingBottom: '30px' }}>
        <Typography variant="h2" sx={{ color: '#333', fontWeight: '700', textAlign: 'center' }}>
          {name}
        </Typography>
      </Box>

      {/* Main content layout */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '30px', gap: '20px' }}>
        {/* Left picture box */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '280px',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <img src={images.Haircut} alt="Service 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>

        {/* Center information box */}
        <Card sx={{
          backgroundColor: '#ffffff',
          width: '380px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>

          <CardContent>
            <Typography variant="h5" sx={{ color: '#555', marginY: '10px' }}>{info}</Typography>
            <Typography variant="subtitle" sx={{ color: '#555555' }}>Hours:</Typography>
            <List>
              {displayHours.map((day, index) => (
                <ListItem key={index}>
                 <ListItemText secondary={`${day}`}></ListItemText>
                </ListItem>
                ))}
            </List>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigation('/customer/services')}
            sx={{ marginTop: '20px', fontWeight: '600', backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '8px' }}
          >
            See Services
          </Button>
        </Card>


        {/* Right picture box */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '280px',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <img src={images.Massage} alt="Service 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      </Box>

      {/* Bottom contact information bar */}
      <Box sx={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        bottom: '0',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
        padding: '0 20px',
      }}>
        <Typography sx={{ color: '#555' }}>Email: {email}</Typography>
        <Typography sx={{ color: '#555' }}>Phone: {phone}</Typography>
        <Typography sx={{ color: '#555' }}>Social Media: {social}</Typography>
      </Box>

      {/* Hamburger menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleNavigation('/customer/calendar')}>Customer Calendar</MenuItem>
        <MenuItem onClick={() => handleNavigation('/customer/services')}>Available Services</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomerHome;