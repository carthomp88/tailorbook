import React, { useState } from 'react';
import { AppBar, Box, IconButton, TextField, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OwnerSiteSettings = () => {
  const navigate = useNavigate();

  // Menu anchor state for the hamburger menu
  const [anchorEl, setAnchorEl] = useState(null);

  // State variables for business information
  const [businessName, setBusinessName] = useState('Gabe’s Spa & Salon');
  const [businessInfo, setBusinessInfo] = useState('Your oasis for relaxation and beauty');
  const [businessHours, setBusinessHours] = useState('M-S: 9-5 | Sundays: Closed');

  // State variables for contact information
  const [contactEmail, setContactEmail] = useState('example@business.com');
  const [contactPhone, setContactPhone] = useState('(123) 456-7890');
  const [contactSocial, setContactSocial] = useState('@businessname');

  // State for image uploads
  const [logo, setLogo] = useState(null); // Stores uploaded logo image
  const [serviceImages, setServiceImages] = useState([null, null, null]); // Stores uploaded service images

  // Handle the menu open and close
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Function to handle logo image upload and preview
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) setLogo(URL.createObjectURL(file)); // Create a preview URL for the uploaded logo
  };

  // Function to handle individual service image upload and preview
  const handleServiceImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...serviceImages];
      newImages[index] = URL.createObjectURL(file); // Create preview URL for the specific service image
      setServiceImages(newImages);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* AppBar with Business Logo and Title */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {/* Display uploaded logo on the top left, or default text if no logo is uploaded */}
          <Box component="div" sx={{ height: '50px', width: '50px', marginRight: '20px' }}>
            {logo ? (
              <img src={logo} alt="Business Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Typography color="textSecondary" align="center">Logo</Typography>
            )}
          </Box>
          
          {/* Title for Site Settings */}
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Site Settings
          </Typography>
          
          {/* Hamburger Menu Icon */}
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Section for uploading a new logo */}
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Upload Business Logo</Typography>
        <Button variant="contained" component="label" sx={{ marginBottom: '20px' }}>
          Upload Logo
          <input hidden accept="image/*" type="file" onChange={handleLogoUpload} />
        </Button>
      </Box>

      {/* Editable Business Information Section */}
      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Business Information</Typography>
        
        <TextField
          label="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        
        <TextField
          label="Business Info"
          value={businessInfo}
          onChange={(e) => setBusinessInfo(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        
        <TextField
          label="Business Hours"
          value={businessHours}
          onChange={(e) => setBusinessHours(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#f5f5f5' }}
        />
      </Box>

      {/* Service Images Section with placeholders and upload buttons */}
      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Service Images</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Loop through each service image and display a preview or upload button */}
          {serviceImages.map((image, index) => (
            <Box key={index} sx={{
              width: '150px', height: '150px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              {image ? (
                <img src={image} alt={`Service ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Typography variant="body1" color="textSecondary">Image {index + 1}</Typography>
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ position: 'absolute', bottom: '-30px', width: '100%' }}
              >
                Upload
                <input hidden accept="image/*" type="file" onChange={(e) => handleServiceImageUpload(index, e)} />
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Contact Information Section */}
      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Contact Information</Typography>
        
        <TextField
          label="Contact Email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        
        <TextField
          label="Contact Phone"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        
        <TextField
          label="Social Media"
          value={contactSocial}
          onChange={(e) => setContactSocial(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#f5f5f5' }}
        />
      </Box>

      {/* Hamburger Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => navigate('/owner/home')}>Dashboard</MenuItem>
        <MenuItem onClick={() => navigate('/owner/services')}>Manage Services</MenuItem>
        <MenuItem onClick={() => navigate('/owner/calendar')}>View Calendar</MenuItem>
        <MenuItem onClick={() => navigate('/owner/site-preview')}>Preview Site</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

export default OwnerSiteSettings;
