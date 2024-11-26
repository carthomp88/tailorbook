const sendEmail = require('./emailService'); // Import the email service

// Replace 'recipient@example.com' with your email for testing
sendEmail('reesecady1@gmail.com', 'Test Email', '<h1>This is a test email</h1>')
  .then(() => console.log('Email sent successfully'))
  .catch((error) => console.error('Error sending email:', error));
