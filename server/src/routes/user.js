import { Router } from 'express';

import { userController } from '../controllers';
import { userValidator } from '../validators';
import { validate } from '../middleware';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', validate(userValidator.getUser), userController.getUser);
router.patch('/:id', validate(userValidator.updateUser), userController.updateUser);
router.delete('/:id', validate(userValidator.deleteUser), userController.deleteUser);

export default router;
