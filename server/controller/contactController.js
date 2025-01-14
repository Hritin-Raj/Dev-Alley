import Contacts from "../models/contacts.js";
import { receiveContactEmail } from "../services/nodemailer.js";

export const storeContactDetails = async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Save to database
      const contact = new Contacts({ name, email, message });
      await receiveContactEmail(contact);
      await contact.save();
  
      res.status(200).json({ success: true, message: "Message saved!" });
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ success: false, error: "Failed to save message." });
    }
  };