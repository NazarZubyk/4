import { extname } from "path";
import * as crypto from 'crypto';
export async function generateFilename(file:Express.Multer.File) {
    const salt = crypto.randomBytes(5).toString('hex');
    // Extract the file extension using the extname function
    const fileExtension = extname(file.originalname);
    // Generate a unique filename using the current timestamp and file extension
    const uniqueFilename = `${Date.now()}${salt}${fileExtension}`;
    return uniqueFilename;
}