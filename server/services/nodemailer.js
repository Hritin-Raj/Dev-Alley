import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Transport Object
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Contact
export const receiveContactEmail = async (formData) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: process.env.EMAIL_ID,
    replyTo: formData.email,
    subject: `Message from ${formData.name}`,
    text: formData.message,
  };
  console.log("mail options", mailOptions);
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


// On Sign Up
export const sendWelcomeEmail = async (formData) => {
  const mailOptions = {
    from: process.env.EMAIL_ID, // sender address
    to: formData.email, // recipient email
    subject: "Welcome to Our Platform!", // email subject
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome ${formData.name}!</h2>
        <p>${formData.message}</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <div style="margin-top: 20px;">
          <p>Best Regards,</p>
          <p>Your Platform Team</p>
        </div>
      </div>
    `
  };

  try {
    // Using Promise-based approach instead of callback
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Propagate error to be handled by the calling function
  }
};
