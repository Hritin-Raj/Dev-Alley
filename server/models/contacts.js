import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Contacts = mongoose.model("contacts", contactSchema);
export default Contacts;
