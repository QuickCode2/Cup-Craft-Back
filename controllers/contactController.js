const transporter = require("../config/mailer"); 

const sendMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    console.log("DATA:", req.body);

    // SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: "☕ New Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");

    res.status(200).json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("EMAIL ERROR:", error);

    res.status(500).json({
      message: "Email failed to send",
    });
  }
};

module.exports = { sendMessage };
