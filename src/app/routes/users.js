import express from 'express';
import authMiddleware from 'app/middlewares/auth';
import UsersController from 'app/controllers/users';

const router = express.Router();

//router.use(authMiddleware.jwt);

router
	.route('/')
	.get(authMiddleware.jwt(), UsersController.list.bind(UsersController));

router
		.route('/profile')
		.get(authMiddleware.jwt(), UsersController.profile.bind(UsersController));

router
		.route('/unsecured')
		.get(UsersController.unSecured.bind(UsersController));

router
		.route('/:id')
		.get(authMiddleware.jwt(), UsersController.get.bind(UsersController));

export default router;