import { Router } from 'express';

import { commentController } from '../controllers';

const router = Router();

router.get('/', commentController.getComments);
router.post('/', commentController.createComment);

router.get('/:id', commentController.getComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
