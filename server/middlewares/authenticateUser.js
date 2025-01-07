import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateUser = (req, res, next) => {
  // Debug logs
  console.log("Headers:", req.headers);
  console.log("Authorization header:", req.headers.authorization);

  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

