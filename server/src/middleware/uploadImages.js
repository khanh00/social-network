import multer from 'multer';

import { AppError } from '../utils';
import { httpStatus } from '../constants';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, './src/assets/images/post');
  },

  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    cb(null, `${req.body.author}-${Date.now()}.${extension}`);
  },
});

const fileFilter = (_, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError(httpStatus.BAD_REQUEST, 'Not an image.'));
  }
};

const uploadImages = multer({ storage, fileFilter }).array('images');

export default uploadImages;
