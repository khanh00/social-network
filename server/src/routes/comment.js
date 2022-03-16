import { Router } from 'express';

import { authController, commentController } from '../controllers';
import { upload } from '../utils';

const router = Router();

router.use(authController.checkIfLoggedIn);

router.get('/', commentController.getComments);
router.post(
  '/',
  upload('image', 'images/comments').array('images'),
  commentController.createComment
);

router.get('/:id', commentController.getComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
