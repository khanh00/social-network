import { Router } from 'express';

import { likeController } from '../controllers';

const router = Router();

router.get('/', likeController.getLikes);
router.post('/', likeController.createLike);

router.get('/:id', likeController.getLike);
router.delete('/:id', likeController.deleteLike);

export default router;
