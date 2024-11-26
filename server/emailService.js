const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: 'gmail', // Email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your app password from .env
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"TailorBook" <${process.env.EMAIL_USER}>`, // Sender's email
    to, // Recipient's email
    subject, // Email subject
    html: htmlContent, // Email body in HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
  }
};

module.exports = sendEmail;
