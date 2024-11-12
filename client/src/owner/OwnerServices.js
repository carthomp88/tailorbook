// OwnerServices Component
// Manages a list of services, allowing the owner to add, edit, and delete services. 
// Services are saved to localStorage, enabling persistence across page reloads. 
// Additionally, images are converted to Base64 for storage in localStorage, ensuring they 
// display correctly upon reload. This solution works well for small image files in a 
// prototype or lightweight production setup.

import React, { useState, useEffect } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, TextField, Toolbar, Typography, List, ListItem, ListItemText, Fab, Button } from '@mui/material';
import { Menu as MenuIcon, Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OwnerServices = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // For managing the menu anchor
  const [serviceName, setServiceName] = useState(''); // Service name input
  const [serviceDescription, setServiceDescription] = useState(''); // Service description input
  const [servicePrice, setServicePrice] = useState(''); // Service price input
  const [serviceImage, setServiceImage] = useState(null); // Stores Base64-encoded service image
  const [editingIndex, setEditingIndex] = useState(null); // Tracks index of service being edited
  const [showForm, setShowForm] = useState(false); // Toggle for displaying the service form
  const [services, setServices] = useState([]); // Stores all services
  
  // Load services from localStorage on component mount
  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem('services'));
    if (savedServices) {
      setServices(savedServices);
    }
  }, []);

  // Handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigate to other pages
  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  // Function to save updated services list to localStorage
  const saveServicesToLocalStorage = (updatedServices) => {
    localStorage.setItem('services', JSON.stringify(updatedServices));
    setServices(updatedServices); // Update the services state
  };

  // Handle adding or updating a service entry
  const handleAddOrUpdateService = () => {
    if (!serviceName || !serviceDescription || !servicePrice) return;

    const newService = {
      name: serviceName,
      description: serviceDescription,
      price: servicePrice,
      image: serviceImage || services[editingIndex]?.image, // Use the existing image if editing
    };

    let updatedServices;
    if (editingIndex !== null) {
      // Update an existing service
      updatedServices = [...services];
      updatedServices[editingIndex] = newService;
      setEditingIndex(null);
    } else {
      // Add a new service
      updatedServices = [...services, newService];
    }

    // Save the updated list to localStorage
    saveServicesToLocalStorage(updatedServices);

    // Clear input fields and hide form
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setServiceImage(null);
    setShowForm(false);
  };

  // Handle deleting a service from the list
  const handleDeleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    saveServicesToLocalStorage(updatedServices); // Update localStorage with the new list
  };

  // Prepare service data for editing
  const handleEditService = (index) => {
    const service = services[index];
    setServiceName(service.name);
    setServiceDescription(service.description);
    setServicePrice(service.price);
    setServiceImage(service.image);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Convert image to Base64 on upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceImage(reader.result); // Set Base64-encoded image
      };
      reader.readAsDataURL(file); // Convert file to Base64 format
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* AppBar with a title and menu */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Owner Services
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hamburger Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleNavigation('/owner/home')}>Owner Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/owner/calendar')}>Owner Calendar</MenuItem>
        <MenuItem onClick={() => navigate('/owner/site-settings')}>Site Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>

      {/* Conditional rendering for the services list or the service form */}
      {!showForm ? (
        <>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Services List</Typography>
          {/* Display list of saved services */}
          {services.length > 0 ? (
            <List>
              {services.map((service, index) => (
                <ListItem key={index} sx={{ backgroundColor: 'white', marginBottom: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                  <Box component="img" src={service.image} alt={service.name} sx={{ width: '100px', height: '100px', borderRadius: '10px', marginRight: '20px' }} />
                  <ListItemText primary={service.name} secondary={`${service.description} - ${service.price}`} />
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditService(index)}><EditIcon /></IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteService(index)}><DeleteIcon /></IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>No services created yet.</Typography>
          )}

          {/* Floating button to add services */}
          <Fab color="primary" aria-label="add" onClick={() => setShowForm(true)} sx={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <AddIcon />
          </Fab>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>{editingIndex !== null ? 'Edit Service' : 'Add New Service'}</Typography>

          {/* Form for adding or editing services */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '20px' }}>
            <TextField label="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} fullWidth variant="outlined" />
            <TextField label="Service Description" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} fullWidth variant="outlined" />
            <TextField label="Service Price" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} fullWidth variant="outlined" />
            <TextField type="file" onChange={handleImageUpload} fullWidth variant="outlined" />

            {/* Save/Cancel buttons */}
            <Button variant="contained" color="primary" onClick={handleAddOrUpdateService} disabled={!serviceName || !serviceDescription || !servicePrice || (!serviceImage && editingIndex === null)}>
              {editingIndex !== null ? 'Save Changes' : 'Add Service'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => { setShowForm(false); setEditingIndex(null); }}>
              Cancel
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OwnerServices;
