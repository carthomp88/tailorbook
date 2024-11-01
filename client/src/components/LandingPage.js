import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './TailorBook.png'; // Import logo image

const LandingPage = () => {
  // State to manage dialog visibility and user type (customer or owner)
  const [open, setOpen] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true); // Track whether the modal is for customer or owner
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to open the dialog and set the user type
  const handleClickOpen = (userType) => {
    setIsCustomer(userType === 'customer'); // Set isCustomer based on button clicked
    setOpen(true); // Open the login dialog
  };

  // Function to close the login dialog
  const handleClose = () => {
    setOpen(false); // Set open to false to close the dialog
  };

  // Function to handle login action
  const handleLogin = () => {
    setEmail(''); // Reset email state
    setPassword(''); // Reset password state
    handleClose(); // Close the login dialog

    // Navigate to the respective home page based on user type
    if (isCustomer) {
      navigate('/customer/home'); // Navigate to Customer Home
    } else {
      navigate('/owner/home'); // Navigate to Owner Home
    }
  };

  return (
    <Box
      sx={{
        height: '100vh', // Full viewport height
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Stack header and content vertically
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        backgroundColor: 'white', // White background color
        overflow: 'hidden', // Hide overflow content
      }}
    >
      {/* Fixed Header at the top */}
      <Box
        sx={{
          position: 'fixed', // Keeps the header fixed at the top
          top: 0, // Positions it at the very top
          width: '100%', // Full width across the viewport
          height: '80px', // Set a fixed height for the header
          backgroundColor: 'white', // White background
          display: 'flex', // Flexbox layout for header
          justifyContent: 'center', // Center text horizontally
          alignItems: 'center', // Center text vertically
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for header
          zIndex: 1000, // Ensure header stays on top of other content
        }}
      >
        {/* Header Text */}
        <Typography
          variant="h4" // Set typography variant to h4
          sx={{
            color: 'black', // Set text color to black
            textAlign: 'center', // Center the text
          }}
        >
          Welcome to TailorBook
        </Typography>
      </Box>

      {/* Main Content - Logo and Buttons in the Middle */}
      <Box
        sx={{
          display: 'flex', // Flexbox layout
          flexDirection: 'column', // Stack logo and buttons vertically
          justifyContent: 'center', // Center content vertically within the remaining space
          alignItems: 'center', // Center content horizontally
          flexGrow: 1, // Take up the remaining height below the fixed header
          paddingTop: '100px', // Padding to adjust for the fixed header height
        }}
      >
        {/* Logo */}
        <Box
          component="img" // Render as an image element
          src={logo} // Set the source to the imported logo
          alt="Logo" // Alt text for the logo
          sx={{
            width: { xs: '80%', sm: '50%' }, // Responsive width: 80% on mobile, 50% on larger screens
            maxWidth: '900px', // Set a maximum width for the logo
            marginBottom: '20px', // Margin below the logo
          }}
        />

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex', // Flexbox for buttons
            justifyContent: 'center', // Center buttons horizontally
            alignItems: 'center', // Align buttons vertically
            gap: 2, // Spacing between the buttons
            marginTop: '20px', // Margin above the buttons
          }}
        >
          {/* Customer Button */}
          <Button
            variant="contained" // Contained button style
            color="primary" // Primary color for the button
            sx={{
              width: { xs: '120px', sm: '160px' }, // Responsive width: 120px on mobile, 160px on larger screens
              height: '50px', // Fixed height for the buttons
            }}
            onClick={() => handleClickOpen('customer')} // Open login dialog for customer
          >
            Customer
          </Button>

          {/* Owner Button */}
          <Button
            variant="contained" // Contained button style
            color="secondary" // Secondary color for the button
            sx={{
              width: { xs: '120px', sm: '160px' }, // Responsive width: 120px on mobile, 160px on larger screens
              height: '50px', // Fixed height for the buttons
            }}
            onClick={() => handleClickOpen('owner')} // Open login dialog for owner
          >
            Owner
          </Button>
        </Box>
      </Box>

      {/* Login Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isCustomer ? 'Customer Login' : 'Owner Login'}</DialogTitle> {/* Title changes based on user type */}
        <DialogContent>
          <TextField
            autoFocus // Automatically focus on this field when dialog opens
            margin="dense" // Set margin to dense for compact spacing
            label="Email" // Label for the email input
            type="email" // Input type for email
            fullWidth // Set input width to full
            variant="outlined" // Set input variant to outlined
            value={email} // Controlled component for email input
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
          <TextField
            margin="dense" // Set margin to dense for compact spacing
            label="Password" // Label for the password input
            type="password" // Input type for password
            fullWidth // Set input width to full
            variant="outlined" // Set input variant to outlined
            value={password} // Controlled component for password input
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} color="primary"> {/* Button to trigger login */}
            Login
          </Button>
          <Link href="/Register" underline="none"> {/* Link to the registration page */}
            <Typography variant="body2">New User? Register Here</Typography> {/* Text for the link */}
          </Link>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage;
