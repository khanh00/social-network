import { Router } from 'express';

import auth from './auth';
import comment from './comment';
import like from './like';
import post from './post';
import user from './user';

const router = Router();

router.use('/auth', auth);
router.use('/comments', comment);
router.use('/likes', like);
router.use('/posts', post);
router.use('/users', user);

export default router;
