import { diskStorage } from 'multer';
import { generateFilename } from '../../utils/generatorUniqueFileName';

export const storage = diskStorage({
  destination: './storage',
  filename: async (req, file, callback) => {
    callback(null, await generateFilename(file));
  },
});
