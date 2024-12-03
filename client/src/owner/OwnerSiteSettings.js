import React, { useState, useEffect } from 'react';
import { AppBar, Box, IconButton, TextField, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import postData from '../components/functions.js'

const res = await axios.get('http://localhost:8080/landing')

const OwnerSiteSettings = () => {
  const navigate = useNavigate();

  // Menu anchor state for the hamburger menu
  const [anchorEl, setAnchorEl] = useState(null);

  // State variables for business and hours information
  const hours = res.data.hours
  const [businessName, setBusinessName] = useState(res.data.name);
  const [businessInfo, setBusinessInfo] = useState(res.data.info);

  const [sundayOpen, updateSunOpen] = useState(hours.sunday.open)
  const [sundayClose, updateSunClose] = useState(hours.sunday.close)
  const [mondayOpen, updateMonOpen] = useState(hours.monday.open)
  const [mondayClose, updateMonClose] = useState(hours.monday.close)
  const [tuesdayOpen, updateTuesOpen] = useState(hours.tuesday.open)
  const [tuesdayClose, updateTuesClose] = useState(hours.tuesday.close)
  const [wednesdayOpen, updateWedOpen] = useState(hours.wednesday.open)
  const [wednesdayClose, updateWedClose] = useState(hours.wednesday.close)
  const [thursdayOpen, updateThursOpen] = useState(hours.thursday.open)
  const [thursdayClose, updateThursClose] = useState(hours.thursday.close)
  const [fridayOpen, updateFriOpen] = useState(hours.friday.open)
  const [fridayClose, updateFriClose] = useState(hours.friday.close)
  const [saturdayOpen, updateSatOpen] = useState(hours.saturday.open)
  const [saturdayClose, updateSatClose] = useState(hours.saturday.close)

  const [showPreview, setShowPreview] = useState(false);

  const [businessHours, setBusinessHours] = useState('Hours: M-S: 9-5 | Sundays: Closed');

  // State variables for contact information
  const [contactEmail, setContactEmail] = useState(res.data.email);
  const [contactPhone, setContactPhone] = useState(res.data.phone);
  const [contactSocial, setContactSocial] = useState(res.data.social);

  // State for image uploads
  const [logo, setLogo] = useState(null); // Stores uploaded logo image
  const [serviceImages, setServiceImages] = useState([null, null, null]); // Stores uploaded service images

  // State for successful save alert
  const [alertMsg, setAlert] = useState('')

  // this hook prevents non-owners from accessing the owner side, instead returning them to login
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.type === 'Owner' || foundUser.type === 'Both');
      else navigate('/')
    }
  });

  // Handle the menu open and close
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Set image preview URL
        localStorage.setItem('logo', reader.result); // Save the base64 image to local storage
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleServiceImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...serviceImages];
        newImages[index] = reader.result; // Update the service images in state
        setServiceImages(newImages);
        localStorage.setItem('serviceImages', JSON.stringify(newImages)); // Save all images to local storage
      };
      reader.readAsDataURL(file);
    }
  };
  
  

  const handleSave = () => {
    const data = {
      name: businessName,
      info: businessInfo,
      email: contactEmail,
      phone: contactPhone,
      social: contactSocial,
      hours: {
        sunday: {
          name: 'Sunday',
          open: sundayOpen,
          close: sundayClose
        },
        monday: {
          name: 'Monday',
          open: mondayOpen,
          close: mondayClose
        },
        tuesday: {
          name: 'Tuesday',
          open: tuesdayOpen,
          close: tuesdayClose
        },
        wednesday: {
          name: 'Wednesday',
          open: wednesdayOpen,
          close: wednesdayClose
        },
        thursday: {
          name: 'Thursday',
          open: thursdayOpen,
          close: thursdayClose
        },
        friday: {
          name: 'Friday',
          open: fridayOpen,
          close: fridayClose
        },
        saturday: {
          name: 'Saturday',
          open: saturdayOpen,
          close: saturdayClose
        }
      }
    }
    postData('http://localhost:8080/landing', data);
    setAlert('Saved');
    setShowPreview(true); // Set the preview to be visible
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
      
      {/* Hours Section */}
      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Hours</Typography>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>(Use format HH:MM AM (or PM) or type Closed)</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Loop through each day and customize hours */}
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
              <Typography>Sunday</Typography>
              <TextField
                value={sundayOpen}
                onChange={(e) => updateSunOpen(e.target.value)}
              />
              <TextField
                value={sundayClose}
                onChange={(e) => updateSunClose(e.target.value)}
              />
              </Box>
            </Box>
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
              <Typography>Monday</Typography>
              <TextField
                value={mondayOpen}
                onChange={(e) => updateMonOpen(e.target.value)}
              />
              <TextField
                value={mondayClose}
                onChange={(e) => updateMonClose(e.target.value)}
              />
              </Box>
            </Box>
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
              <Typography>Tuesday</Typography>
              <TextField
                value={tuesdayOpen}
                onChange={(e) => updateTuesOpen(e.target.value)}
              />
              <TextField
                value={tuesdayClose}
                onChange={(e) => updateTuesClose(e.target.value)}
              />
              </Box>
            </Box>
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
              <Typography>Wednesday</Typography>
              <TextField
                value={wednesdayOpen}
                onChange={(e) => updateWedOpen(e.target.value)}
              />
              <TextField
                value={wednesdayClose}
                onChange={(e) => updateWedClose(e.target.value)}
              />
              </Box>
            </Box>
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
              <Typography>Thursday</Typography>
              <TextField
                value={thursdayOpen}
                onChange={(e) => updateThursOpen(e.target.value)}
              />
              <TextField
                value={thursdayClose}
                onChange={(e) => updateThursClose(e.target.value)}
              />
              </Box>
            </Box>
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
              <Typography>Friday</Typography>
              <TextField
                value={fridayOpen}
                onChange={(e) => updateFriOpen(e.target.value)}
              />
              <TextField
                value={fridayClose}
                onChange={(e) => updateFriClose(e.target.value)}
              />
              </Box>
            </Box>
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
              <Typography>Saturday</Typography>
              <TextField
                value={saturdayOpen}
                onChange={(e) => updateSatOpen(e.target.value)}
              />
              <TextField
                value={saturdayClose}
                onChange={(e) => updateSatClose(e.target.value)}
              />
              </Box>
            </Box>
        </Box>
        <Button
        onClick={handleSave}>
          Save Changes
        </Button>
        <Typography align='center'>{alertMsg}</Typography>
      </Box>

      {/* Single Day Custom Hours Section */}
      <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>Add Holiday/Closure/Special Hours</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{
              width: '300px', height: '200px', backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Typography>Coming Soon :)</Typography>
            </Box>
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
        <Button
        onClick={handleSave}>
          Save Changes
        </Button>
        <Typography align='center'>{alertMsg}</Typography>
      </Box>

            {/* show preview Section */}
      {showPreview && (
  <Box sx={{ 
    padding: '24px', 
    textAlign: 'center', 
    backgroundColor: '#f5f5f5', 
    marginTop: '20px', 
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '20px auto'
  }}>
    <Typography 
      variant="h4" 
      sx={{ 
        marginBottom: '16px', 
        color: 'primary.main', 
        fontWeight: 'bold' 
      }}
    >
      Live Preview
    </Typography>
    
    <Typography 
      variant="h5" 
      sx={{ 
        marginBottom: '12px', 
        color: 'text.primary' 
      }}
    >
      {businessName}
    </Typography>
    
    <Typography 
      variant="body1" 
      sx={{ 
        marginBottom: '20px', 
        color: 'text.secondary' 
      }}
    >
      {businessInfo}
    </Typography>
    
    <Box sx={{ 
      backgroundColor: 'background.paper', 
      borderRadius: '8px', 
      padding: '16px', 
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          marginBottom: '12px', 
          fontWeight: 'bold' 
        }}
      >
        Business Hours
      </Typography>
      <Box>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'text.secondary' }}>Sunday:</span>
          <span>{sundayOpen} - {sundayClose}</span>
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'text.secondary' }}>Monday:</span>
          <span>{mondayOpen} - {mondayClose}</span>
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'text.secondary' }}>Tuesday:</span>
          <span>{tuesdayOpen} - {tuesdayClose}</span>
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'text.secondary' }}>Wednesday:</span>
          <span>{wednesdayOpen} - {wednesdayClose}</span>
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'text.secondary' }}>Thursday:</span>
          <span>{thursdayOpen} - {thursdayClose}</span>
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'text.secondary' }}>Friday:</span>
          <span>{fridayOpen} - {fridayClose}</span>
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'text.secondary' }}>Saturday:</span>
          <span>{saturdayOpen} - {saturdayClose}</span>
        </Typography>
      </Box>
    </Box>
    
    <Box sx={{ 
      backgroundColor: 'background.paper', 
      borderRadius: '8px', 
      padding: '16px', 
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          marginBottom: '12px', 
          fontWeight: 'bold' 
        }}
      >
        Contact Information
      </Typography>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
          Email: <Typography component="span" color="text.primary">{contactEmail}</Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
          Phone: <Typography component="span" color="text.primary">{contactPhone}</Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Social Media: <Typography component="span" color="text.primary">{contactSocial}</Typography>
        </Typography>
      </Box>
    </Box>
    
    {logo && (
      <Box sx={{ 
        backgroundColor: 'background.paper', 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            marginBottom: '12px', 
            fontWeight: 'bold' 
          }}
        >
          Logo
        </Typography>
        <img 
          src={logo} 
          alt="Business Logo" 
          style={{ 
            maxWidth: '200px', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }} 
        />
      </Box>
    )}
    
    {serviceImages.length > 0 && (
      <Box sx={{ 
        backgroundColor: 'background.paper', 
        borderRadius: '8px', 
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            marginBottom: '12px', 
            fontWeight: 'bold' 
          }}
        >
          Service Images
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px'
        }}>
          {serviceImages.map((image, index) => (
            image && (
              <img 
                key={index} 
                src={image} 
                alt={`Service ${index + 1}`} 
                style={{ 
                  maxWidth: '200px', 
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} 
              />
            )
          ))}
        </Box>
      </Box>
    )}
  </Box>
)}


      {/* Hamburger Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => navigate('/owner/home')}>Dashboard</MenuItem>
        <MenuItem onClick={() => navigate('/owner/services')}>Manage Services</MenuItem>
        <MenuItem onClick={() => navigate('/owner/calendar')}>View Calendar</MenuItem>
        <MenuItem onClick={() => {localStorage.clear(); navigate('/')}}>Log Out</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
    </Box>
  );
};

export default OwnerSiteSettings;


