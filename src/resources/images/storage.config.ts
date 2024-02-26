import e from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { generateFilename } from "src/utils/generatorUniqueFileName";

export const storage = diskStorage({
    destination: "./storage",
    filename: async (req, file, callback) => {
      callback(null,await generateFilename(file));
    }
  });
  
