import { Router } from 'express';

import { authController, postController } from '../controllers';
import { validate } from '../middleware';
import { postValidation } from '../validations';
import { upload } from '../utils';

const router = Router();

router.use(authController.checkIfLoggedIn);

router.get('/', postController.getPosts);
router.post(
  '/',
  upload('image', 'images/post').array('images'),
  validate(postValidation.createPost),
  postController.createPost
);

router.get('/:id', postController.getPost);
router.patch('/:id', validate(postValidation.updatePost), postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;
