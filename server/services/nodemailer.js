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

export const sendEmail = async (formData) => {
  console.log("form data", formData);
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
