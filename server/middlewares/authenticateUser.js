import jwt from "jsonwebtoken";
import Users from "../models/users.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

