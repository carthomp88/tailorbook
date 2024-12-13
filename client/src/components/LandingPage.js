import React, { useState, useEffect } from 'react'; // Import React and useState for managing component state
//import axios from 'axios' // Import Axios for API calls to the backend
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Link, DialogContentText } from '@mui/material'; // Import necessary Material-UI components
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import logo from './TailorBook.png'; // Import logo image

// Posts a data object to the main express route (in this case, usually login info)
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

// Confirms password and hash match in the backend
// For various reasons, it's more practical than trying to do that here
async function confirmMatch(data) {
  const check = await postData('http://localhost:8080/check', data)
  return await check
}


const LandingPage = () => {
  // State to manage dialog visibility and user type (customer or owner)
  const [open, setOpen] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true); // Track whether the modal is for customer or owner
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input
  const [alertmsg, setAlert] = useState('')

  // If a user is already logged in, going to the landing page instead redirects to the home page of that user's side
  // e.g. owners go right to the Owner Dashboard, customers go right to Customer Home
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.type === 'Owner' || foundUser.type === 'Both') navigate('/owner/home')
      else navigate('/customer/home')
    }
  });

  // Case manager for the user object returned from the DB
  // Pre: A user object, or an empty object
  // Post:  Handles the login result in the dialog box.
  //        Sets useful alert text if something goes wrong, too.
  const loginCase = (user) => {
    const userCases = async (val, user) => {
      console.log('in usercases')
      if (!user) {
        return 3
      }
      else if (user.type !== userType && user.type !== 'Both') {
        return 2
      }
      if (val !== -1) return val
      else return -1
    }
    const userType = isCustomer ? 'Customer' : 'Owner'
    const resolveCase = async (caseNum) => {
      switch (caseNum) {
        case 3:
            caseMsg.msg = "Incorrect Email or Password"
            //console.log(caseMsg.msg)
            setAlert(caseMsg.msg)
            break;
        case 2:
            caseMsg.msg = "Email not registered as " + (isCustomer ? 'customer' : 'owner')
            //console.log(caseMsg.msg)
            setAlert(caseMsg.msg)
            break;
        case 1:
            caseMsg.msg = "Success"
            //console.log(caseMsg.msg)
            if (isCustomer) {
              const savedUser = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                type: user.type
              }
              localStorage.setItem('user', JSON.stringify(savedUser))
              navigate('/customer/home'); // Navigate to Customer Home
            } else {
              navigate('/owner/home'); // Navigate to Owner Home
            }
            break;
        case 0:
            caseMsg.msg = "Incorrect Email or Password"
            //console.log(caseMsg.msg)
            setAlert(caseMsg.msg)
            break;
        default:
            console.log("hurr durr")
      }
    }
    const caseMsg = {msg: ""}
    // if there is a password, compare
    if (user.password !== undefined) {
      const data = {password: password, hash: user.password}
      confirmMatch(data)
      .then(val => {
          if (val === 1) {return 1} 
          else return 0
      })
      .then(val => userCases(val, user))
      //.then(caseNum => passwordCases(caseNum))
      .then(caseNum => resolveCase(caseNum))
      //console.log('caseNum is ' + caseNum)}
    } else {
      resolveCase(3);
    }
  }

  const navigate = useNavigate(); // Initialize useNavigate for navigation

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
    .then(user => loginCase(user ? user : {}))
    .catch(err => console.log(err))
    setEmail(''); // Reset email state
    setPassword(''); // Reset password state
    //handleClose(); // Close the login dialog
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

export default LandingPage;
