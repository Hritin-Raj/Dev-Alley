import multer from "multer";

// Configure multer for file uploads
const storage = multer.memoryStorage(); // You can configure this to store files in memory or disk
const upload = multer({ storage });

// Export the multer middleware for routes
export const uploadMiddleware = upload.array("images", 5); // Max 5 files