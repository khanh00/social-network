import multer from 'multer';

import AppError from './AppError';
import { httpStatus } from '../constants';

const upload = (destination) => {
  const storage = multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, `./public/${destination}/${file.mimetype.split('/')[0]}s`);
    },

    filename: (req, file, cb) => {
      cb(null, `${req.author}-${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (_, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
      cb(null, true);
    } else {
      cb(new AppError(httpStatus.BAD_REQUEST, `Invalid file.`));
    }
  };

  return multer({ storage, fileFilter });
};

export default upload;
