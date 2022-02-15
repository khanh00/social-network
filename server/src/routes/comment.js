import { Router } from 'express';

import { authController, commentController } from '../controllers';
import { uploadImages } from '../middleware';

const router = Router();

router.use(authController.checkIfLoggedIn);

router.get('/', commentController.getComments);
router.post('/', uploadImages, commentController.createComment);

router.get('/:id', commentController.getComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
