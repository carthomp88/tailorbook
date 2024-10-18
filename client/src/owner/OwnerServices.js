import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, TextField, Toolbar, Typography, List, ListItem, ListItemText, Fab, Button } from '@mui/material';
import { Menu as MenuIcon, Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material'; // Icons for deleting, adding, and editing services
import { useNavigate } from 'react-router-dom';

const OwnerServices = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceImage, setServiceImage] = useState(null); // Store the uploaded image file
  const [editingIndex, setEditingIndex] = useState(null); // Track which service is being edited
  const [showForm, setShowForm] = useState(false); // Toggle between service list and form view
  const [services, setServices] = useState([]); // State to store the list of services

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

  // Function to handle adding or updating a service
  const handleAddOrUpdateService = () => {
    const newService = {
      name: serviceName,
      description: serviceDescription,
      price: servicePrice,
      image: serviceImage ? URL.createObjectURL(serviceImage) : services[editingIndex]?.image, // Retain the current image if not changed
    };

    if (editingIndex !== null) {
      // Update the existing service
      const updatedServices = [...services];
      updatedServices[editingIndex] = newService;
      setServices(updatedServices);
      setEditingIndex(null); // Reset the editing index
    } else {
      // Add a new service
      setServices([...services, newService]);
    }

    // Clear the input fields and reset the image state
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setServiceImage(null);
    setShowForm(false); // Go back to the service list
  };

  // Function to handle deleting a service
  const handleDeleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index); // Remove the service by index
    setServices(updatedServices); // Update the services state
  };

  // Function to handle editing a service
  const handleEditService = (index) => {
    const service = services[index];
    setServiceName(service.name);
    setServiceDescription(service.description);
    setServicePrice(service.price);
    setServiceImage(null); // Set to null to avoid overriding the image unless a new one is uploaded
    setEditingIndex(index); // Set the editing index to track which service is being edited
    setShowForm(true); // Show the form for editing
  };

  // Function to handle file input (image upload)
  const handleImageUpload = (e) => {
    setServiceImage(e.target.files[0]); // Store the selected image file in state
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}> {/* Light background */}
      
      {/* AppBar with a modern white background and subtle shadow */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>
            Owner Services
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: '#000000' }} /> {/* Modern black hamburger menu icon */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hamburger menu for navigation */}
      <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={Boolean(anchorEl)} // Open state of the menu
        onClose={handleMenuClose} // Close the menu
      >
        <MenuItem onClick={() => handleNavigation('/owner/home')}>Owner Home</MenuItem> {/* Navigate to Owner Home */}
        <MenuItem onClick={() => handleNavigation('/owner/calendar')}>Owner Calendar</MenuItem> {/* Navigate to Owner Calendar */}
        <MenuItem onClick={() => handleNavigation('/owner/services')}>Owner Services</MenuItem> {/* Navigate to Owner Services */}
        <MenuItem onClick={handleMenuClose}>Close</MenuItem> {/* Close the menu */}
      </Menu>

      {/* Show the list of services if the form is not being displayed */}
      {!showForm ? (
        <>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            Services List
          </Typography>

          {/* Display list of services */}
          {services.length > 0 ? (
            <List>
              {services.map((service, index) => (
                <ListItem
                  key={index}
                  sx={{ backgroundColor: 'white', marginBottom: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center' }}
                >
                  {/* Display service image */}
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.name}
                    sx={{ width: '100px', height: '100px', borderRadius: '10px', marginRight: '20px' }}
                  />

                  {/* Display service details */}
                  <ListItemText
                    primary={service.name}
                    secondary={`${service.description} - $${service.price}`}
                  />

                  {/* Edit button */}
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditService(index)}>
                    <EditIcon />
                  </IconButton>

                  {/* Delete button for the service */}
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteService(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
              No services created yet.
            </Typography>
          )}

          {/* Floating + button to add more services */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setShowForm(true)} // Show the form when clicked
            sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
          >
            <AddIcon />
          </Fab>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            {editingIndex !== null ? 'Edit Service' : 'Add New Service'} {/* Dynamic heading for editing or adding */}
          </Typography>

          {/* Input fields for adding or editing services */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
            {/* Input for service name */}
            <TextField
              label="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />

            {/* Input for service description */}
            <TextField
              label="Service Description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />

            {/* Input for service price */}
            <TextField
              label="Service Price"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />

            {/* File input for uploading service image */}
            <TextField
              type="file"
              onChange={handleImageUpload}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />

            {/* Button to add or save the service */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrUpdateService}
              sx={{ alignSelf: 'center', width: '200px' }}
              disabled={!serviceName || !serviceDescription || !servicePrice || (!serviceImage && editingIndex === null)} // Disable button if any field is missing
            >
              {editingIndex !== null ? 'Save Changes' : 'Add Service'} {/* Dynamic button text for editing or adding */}
            </Button>

            {/* Button to cancel adding or editing service and go back to list */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => { setShowForm(false); setEditingIndex(null); }} // Hide the form and reset editing index
              sx={{ alignSelf: 'center', width: '200px', marginTop: '10px' }}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OwnerServices;
