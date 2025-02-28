import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Funktion til at sende e-mail
const sendEmail = async (req, res) => {
  const { name, email, phone, plate, description } = req.body;

  dotenv.config();

  // Konfigurer din SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.simply.com', // Opdateret til Simply.com SMTP-server
    port: 587, // Opdateret port
    secure: false, // Brug STARTTLS
    auth: {
      user: process.env.EMAIL, // Brug miljøvariabel til e-mail
      pass: process.env.EMAIL_PASSWORD, // Brug miljøvariabel til adgangskode
    },
  });

  const mailOptions = {
    from: process.env.EMAIL, // Ændret til at bruge den autoriserede afsenderadresse
    to: 'info@wentzelevent.dk', // Erstat med den e-mail, der skal modtage formularindsendelsen
    subject: `[Wentzel Event] Hjemmeside kontakt form ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Description: ${description}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
};

export default { sendEmail };
