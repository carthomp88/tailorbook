import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Register = () => {
  // State to handle form input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    setName('');
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

      {/* Form starts here */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
