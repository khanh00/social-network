import { Router } from 'express';

import { authController, postController } from '../controllers';
import { uploadImages, validate } from '../middleware';
import { postValidation } from '../validations';

const router = Router();

router.use(authController.checkIfLoggedIn);

router.get('/', postController.getPosts);
router.post('/', uploadImages, postController.createPost);

router.get('/:id', postController.getPost);
router.patch(
  '/:id',
  validate(postValidation.updatePost),
  postController.updatePost
);
router.delete('/:id', postController.deletePost);

export default router;
