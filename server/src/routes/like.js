import { Router } from 'express';

import { authController, likeController } from '../controllers';

const router = Router();

router.use(authController.checkIfLoggedIn);

router.get('/', likeController.getLikes);
router.get('/me', likeController.getAuthorLikes);
router.post('/', likeController.createLike);

router.get('/:id', likeController.getLike);
router.delete('/:id', likeController.deleteLike);

export default router;
