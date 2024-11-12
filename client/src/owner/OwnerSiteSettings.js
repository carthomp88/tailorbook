import React, { useState } from 'react';
import { AppBar, Box, IconButton, TextField, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OwnerSiteSettings = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [businessName, setBusinessName] = useState('Gabe’s Spa & Salon');
  const [businessInfo, setBusinessInfo] = useState('Your oasis for relaxation and beauty');
  const [businessHours, setBusinessHours] = useState('M-S: 9-5 | Sundays: Closed');
  const [contactEmail, setContactEmail] = useState('example@business.com');
  const [contactPhone, setContactPhone] = useState('(123) 456-7890');
  const [contactSocial, setContactSocial] = useState('@businessname');
  const [logo, setLogo] = useState(null);
  const [serviceImages, setServiceImages] = useState([null, null, null]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleServiceImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...serviceImages];
      newImages[index] = URL.createObjectURL(file);
      setServiceImages(newImages);
    }
  };

  const handleSave = () => {
    // Perform save logic here, then navigate to the dashboard
    console.log('Settings saved');
    navigate('/owner/home');
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '100px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Box component="div" sx={{ height: '50px', width: '50px', marginRight: '20px' }}>
            {logo ? (
              <img src={logo} alt="Business Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Typography color="textSecondary" align="center">Logo</Typography>
            )}
          </Box>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Site Settings
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Upload Business Logo</Typography>
        <Button variant="contained" component="label" sx={{ marginBottom: '20px' }}>
          Upload Logo
          <input hidden accept="image/*" type="file" onChange={handleLogoUpload} />
        </Button>
      </Box>

      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Business Information</Typography>
        <TextField label="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} fullWidth variant="outlined" sx={{ backgroundColor: '#f5f5f5' }} />
        <TextField label="Business Info" value={businessInfo} onChange={(e) => setBusinessInfo(e.target.value)} fullWidth variant="outlined" sx={{ backgroundColor: '#f5f5f5' }} />
        <TextField label="Business Hours" value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} fullWidth variant="outlined" sx={{ backgroundColor: '#f5f5f5' }} />
      </Box>

      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Service Images</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
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
              <Button variant="contained" component="label" sx={{ position: 'absolute', bottom: '-30px', width: '100%' }}>
                Upload
                <input hidden accept="image/*" type="file" onChange={(e) => handleServiceImageUpload(index, e)} />
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Contact Information</Typography>
        <TextField label="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} fullWidth variant="outlined" sx={{ backgroundColor: '#f5f5f5' }} />
        <TextField label="Contact Phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} fullWidth variant="outlined" sx={{ backgroundColor: '#f5f5f5' }} />
        <TextField label="Social Media" value={contactSocial} onChange={(e) => setContactSocial(e.target.value)} fullWidth variant="outlined" sx={{ backgroundColor: '#f5f5f5' }} />
      </Box>

      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>

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
