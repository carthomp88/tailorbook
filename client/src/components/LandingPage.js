import React, { useState } from 'react'; // Import React and useState for managing component state
//import axios from 'axios' // Import Axios for API calls to the backend
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Link, DialogContentText } from '@mui/material'; // Import necessary Material-UI components
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import logo from './TailorBook.png'; // Import logo image

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return await response.json();
}

const LandingPage = () => {
  // State to manage dialog visibility and user type (customer or owner)
  const [open, setOpen] = useState(false); 
  const [isCustomer, setIsCustomer] = useState(true); // Track whether the modal is for customer or owner
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input
  const [alertmsg, setAlert] = useState('')

  // Case manager for the user object returned from the DB
  // Pre: A user object, or an empty object
  // Post:  Handles the login result in the dialog box.
  //        Sets useful alert text if something goes wrong, too.
  const loginCase = (user) => {
    let caseNum = -1
    const userType = isCustomer ? 'Customer' : 'Owner'
    if (!user) {
        caseNum =  0
    }
    else if (user.type !== userType && user.type !== 'Both') {
        caseNum = 1
    }
    else {
        if (password === user.password) {
            caseNum = 2
        }
        else {
            caseNum = 3
        }
    }

    const caseMsg = {msg: ""}
    switch (caseNum) {
      case 0:
          caseMsg.msg = "Email not registered"
          //console.log(caseMsg.msg)
          setAlert(caseMsg.msg)
          break;
      case 1:
          caseMsg.msg = "Email not registered as " + (isCustomer ? 'customer' : 'owner')
          //console.log(caseMsg.msg)
          setAlert(caseMsg.msg)
          break;
      case 2:
          caseMsg.msg = "Success"
          //console.log(caseMsg.msg)
          if (isCustomer) {
            navigate('/customer/home'); // Navigate to Customer Home
          } else {
            navigate('/owner/home'); // Navigate to Owner Home
          }
          break;
      case 3:
          caseMsg.msg = "Incorrect password"
          //console.log(caseMsg.msg)
          setAlert(caseMsg.msg)
          break;
      default:
          console.log("hurr durr")
    }
    //console.log('caseNum is ' + caseNum)
}

  const navigate = useNavigate(); // Initialize useNavigate for navigation for non links

  // Function to open the dialog and set the user type
  const handleClickOpen = (userType) => {
    setIsCustomer(userType === 'customer'); // Set isCustomer based on button clicked
    setOpen(true); // Open the login dialog
  };

  // Function to close the login dialog
  const handleClose = () => {
    setOpen(false); // Set open to false to close the dialog
    setAlert('')
  };

  // Function to handle login action
  const handleLogin = () => {
    //console.log('Email:', email); // Log email for debugging
    //console.log('Password:', password); // Log password for debugging
    const data = { email: email } //, password: password, type: (isCustomer? 'customer' : 'owner')}
    postData("http://localhost:8080/login", data)
    .then(user => loginCase(user))
    .catch(err => console.log(err))
    setEmail(''); // Reset email state
    setPassword(''); // Reset password state
    //handleClose(); // Close the login dialog
  };

  return (
    <Box
      sx={{
        position: 'relative', // Set position relative for the Box
        height: '100vh', // Full viewport height
        backgroundColor: 'white', // Black background color
        overflow: 'hidden', // Hide overflow content
        margin: 0, // Remove any margin
        padding: 0, // Remove any padding
      }}
    >
        <Box
    component="img" // Set the component type to img
    src={logo} // Set the source of the image to the logo
    alt="Logo" // Alt text for the logo
    sx={{
      width: '50%', // Adjust width to 50% of the viewport width
      maxWidth: '700px', // Set a maximum width for the logo
      position: 'absolute', // Position the logo absolutely
      top: '60%', // Center the logo vertically
      left: '50%', // Center the logo horizontally
      transform: 'translate(-50%, -50%)', // Adjust position to truly center both vertically and horizontally
    }}
  />
      <Typography
        variant="h2" // Set typography variant to h2
        sx={{
          position: 'absolute', // Position text absolutely
          top: '40px', // Position text 40px from the top
          left: '50%', // Center the text horizontally
          transform: 'translateX(-50%)', // Adjust position to truly center the text
          color: 'black', // Set text color to white
        }}
      >
        Welcome to TailorBook
      </Typography>
      <Box
        sx={{
          position: 'absolute', // Position buttons absolutely
          top: '200px', // Position buttons 200px from the top
          left: '50%', // Center buttons horizontally
          transform: 'translateX(-50%)', // Adjust position to truly center the buttons
        }}
      >
        <Button
          variant="contained" // Set button variant to contained
          color="primary" // Set primary color for the button
          sx={{ marginRight: '10px' }} // Add margin to the right of the button
          onClick={() => handleClickOpen('customer')} // Open login dialog for customer
        >
          Customer
        </Button>
        <Button
          variant="contained" // Set button variant to contained
          color="secondary" // Set secondary color for the button
          onClick={() => handleClickOpen('owner')} // Open login dialog for owner
        >
          Owner
        </Button>
      </Box>

      {/* Login dialog for user authentication */}
      <Dialog open={open} onClose={handleClose}> 
        <DialogTitle>{isCustomer ? 'Customer Login' : 'Owner Login'}</DialogTitle> {/* Title changes based on user type */}
        <DialogContent>
          <DialogContentText>
            {alertmsg}
          </DialogContentText>
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

export default LandingPage; // Export LandingPage component for use in other files
