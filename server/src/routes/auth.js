import express from 'express';

import { authController } from '../controllers';
import { authValidation } from '../validations';
import { validate } from '../middleware';

const router = express.Router();

router.post('/signup', validate(authValidation.signup), authController.signup);
router.post('/login', validate(authValidation.login), authController.login);
router.get('/logout', authController.checkIfLogin, authController.logout);

export default router;
