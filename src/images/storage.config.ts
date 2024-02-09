import e from "express";
import { diskStorage } from "multer";
import { extname } from "path";

export const storage = diskStorage({
    destination: "./storage",
    filename: async (req, file, callback) => {
      callback(null,await generateFilename(file));
    }
  });
  
  async function generateFilename(file) {
    // Extract the file extension using the extname function
    const fileExtension = extname(file.originalname);
    // Generate a unique filename using the current timestamp and file extension
    const uniqueFilename = `${Date.now()}${fileExtension}`;
    return uniqueFilename;
}