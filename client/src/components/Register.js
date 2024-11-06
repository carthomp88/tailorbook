import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

import postData from './functions.js'

const Register = () => {
  // State to handle form input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertmsg, setAlert] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {firstName: firstName, lastName: lastName, email: email, password: password, type: 'Customer'}
    postData("http://localhost:8080/register", data)
    // If the email is found, an empty object is returned from the backend. If the email is not found, the new user's data is sent back
    // to be used later.
    .then(user => user.email !== undefined ? setAlert("Successfully registered!") : setAlert("Email already in use!"))
    .catch(err => console.log(err));
    // Reset form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        width: '100%', // Full width for the box
        maxWidth: '400px', // Maximum width for the box
        margin: '100px auto', // Center the box vertically and horizontally
        padding: '30px', // Add padding inside the box
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle box shadow for a clean effect
        borderRadius: '10px', // Rounded corners
        backgroundColor: '#ffffff', // White background for the box
        textAlign: 'center', // Center the text inside the box
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register Here
      </Typography>

      <Typography variant="h5">{alertmsg}</Typography>

      {/* Form starts here */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Register;
