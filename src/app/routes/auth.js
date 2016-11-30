import express from 'express';
//import authMiddleware from 'app/middlewares/auth';
import AuthController from 'app/controllers/auth';
import Validator from 'express-validation';
import authValidators from 'app/validators/auth';

const router = express.Router();

//router.use(authMiddleware.handle);

router
	.route('/login')
	.post([Validator(authValidators.login), AuthController.login.bind(AuthController)]);

router
	.route('/register')
	.post([Validator(authValidators.register), AuthController.register.bind(AuthController)]);

export default router;