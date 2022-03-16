import multer from 'multer';

import AppError from './AppError';
import { httpStatus } from '../constants';

const upload = (type, destination) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, `./src/public/${destination}`);
    },

    filename: (req, file, cb) => {
      cb(null, `${req.author}-${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (_, file, cb) => {
    if (file.mimetype.startsWith(type)) {
      cb(null, true);
    } else {
      cb(new AppError(httpStatus.BAD_REQUEST, `Not ${type}.`));
    }
  };

  return multer({ storage, fileFilter });
};

export default upload;
