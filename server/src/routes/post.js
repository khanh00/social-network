import { Router } from 'express';

import { postController } from '../controllers';

const router = Router();

router.get('/', postController.getPosts);
router.post('/', postController.createPost);

router.get('/:id', postController.getPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;
