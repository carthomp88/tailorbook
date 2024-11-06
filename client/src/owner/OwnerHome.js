import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Import hamburger menu icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'
import postData from '../components/functions.js'

// AXIOS CALLS TO POPULATE WITH EXISTING LANDING INFO
const landing = await axios.get('http://localhost:8080/landing')
const hours = await axios.get('http://localhost:8080/hours')
const days = await axios.get('http://localhost:8080/days')

const OwnerHome = () => {
  const [name, setName] = useState(landing.data.name)
  const [info, setInfo] = useState(landing.data.info)
  const [email, setEmail] = useState(landing.data.email)
  const [phone, setPhone] = useState(landing.data.phone)
  const [socials, setSocials] = useState(landing.data.social)
  const [alertmsg, setAlert] = useState('')

  const navigate = useNavigate(); // Initialize useNavigate
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor

  const handleSave = () => {
    console.log('saving')
    const data = {name: name, info: info, email: email, phone: phone, social: socials}
    postData('http://localhost:8080/landing', data)
    .then(setAlert('Changes saved successfully!'))
    .catch(err => console.log(err))
  }

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
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '100px' }}> {/* Light background with space for the footer */}
      {/* AppBar with a modern white background and subtle shadow */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Owner Home
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} /> {/* Modern black hamburger menu icon */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main container for layout */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px' }}>
        {/* Left box for pictures */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '200px', // Smaller width for a cleaner look
          height: '300px', // Smaller height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '30px', // Reduced margin for smaller spacing
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern effect
          borderRadius: '10px', // Rounded corners
        }}>
          <TextField variant="outlined" placeholder="Insert Picture" sx={{ width: '80%', backgroundColor: '#f5f5f5' }} /> {/* Lighter background */}
        </Box>

        {/* Middle large vertical rectangle for editable business info */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '300px', // Reduced width for a modern look
          height: '300px', // Reduced height
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '30px', // Reduced margin
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern effect
          borderRadius: '10px', // Rounded corners
          padding: '20px',
        }}>
          <Typography variant="p">{alertmsg}</Typography>
          <TextField 
            variant="outlined" 
            placeholder="Edit Business Name" 
            sx={{ width: '80%', backgroundColor: '#f5f5f5' }} 
            value={name} // Controlled component for email input
            onChange={(e) => setName(e.target.value)} // Update email state on change
          />
          <TextField 
            variant="outlined" 
            placeholder="Edit Business Info" 
            sx={{ width: '80%', backgroundColor: '#f5f5f5' }}  
            value={info} // Controlled component for email input
            onChange={(e) => setInfo(e.target.value)} // Update email state on change
          />
          <TextField 
            variant="outlined" 
            placeholder="Edit Business Hours" 
            sx={{ width: '80%', backgroundColor: '#f5f5f5' }}  // Controlled component for email input
          />
          <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
          onClick={handleSave}
        >
          Save Changes
      </Button>
        </Box>

        {/* Right box for pictures */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '200px', // Smaller width for a cleaner look
          height: '300px', // Smaller height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '30px', // Reduced margin
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern effect
          borderRadius: '10px', // Rounded corners
        }}>
          <TextField variant="outlined" placeholder="Insert Picture" sx={{ width: '80%', backgroundColor: '#f5f5f5' }} /> {/* Lighter background */}
        </Box>
      </Box>

      

      {/* Fixed bottom bar for contact information */}
      <Box sx={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed', // Fixed position at the bottom
        bottom: '0', // Stick to the bottom
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow at the bottom
      }}>
        <TextField 
          variant="outlined" 
          placeholder="Insert Email" 
          sx={{ width: '30%', backgroundColor: '#f5f5f5' }}  
          value={email} // Controlled component for email input
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
        />
        <TextField 
          variant="outlined" 
          placeholder="Insert Phone Number" 
          sx={{ width: '30%', backgroundColor: '#f5f5f5' }}  
          value={phone} // Controlled component for email input
          onChange={(e) => setPhone(e.target.value)} // Update email state on change
        />
        <TextField 
          variant="outlined" 
          placeholder="Insert Social Media" 
          sx={{ width: '30%', backgroundColor: '#f5f5f5' }}  
          value={socials} // Controlled component for email input
          onChange={(e) => setSocials(e.target.value)} // Update email state on change
        />
      </Box>

      {/* Hamburger menu for navigation */}
      <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={Boolean(anchorEl)} // Open state of the menu
        onClose={handleMenuClose} // Close the menu
      >
        <MenuItem onClick={() => handleNavigation('/owner/calendar')}>Owner Calendar</MenuItem> {/* Navigate to Owner Calendar */}
        <MenuItem onClick={() => handleNavigation('/owner/services')}>Owner Services</MenuItem> {/* Navigate to Owner Services */}
        <MenuItem onClick={handleMenuClose}>Close</MenuItem> {/* Close the menu */}
      </Menu>
    </Box>
  );
};

export default OwnerHome; // Export the component for use in other files
