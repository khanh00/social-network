import { Router } from 'express';

import { authController, commentController } from '../controllers';
import { validate } from '../middleware';
import { commentValidation } from '../validations';

const router = Router();

router.use(authController.checkIfLoggedIn);

router.get('/', commentController.getComments);
router.post('/', validate(commentValidation.createComment), commentController.createComment);

router.get('/:id', commentController.getComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
