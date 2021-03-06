import { Router } from 'express';

import { authController, userController } from '../controllers';
import { userValidation } from '../validations';
import { validate } from '../middleware';

const router = Router();

router.use(authController.checkIfLoggedIn);

router.get('/', userController.getUsers);
router.get('/me', userController.getCurrentUser);
router.get('/:id', validate(userValidation.getUser), userController.getUser);
router.patch('/:id', validate(userValidation.updateUser), userController.updateUser);
router.delete('/:id', validate(userValidation.deleteUser), userController.deleteUser);

export default router;
