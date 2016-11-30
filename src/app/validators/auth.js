import Joi from 'joi';

export default {
	// GET /auth/login
	login: {
		body: {
			email:      Joi.string().email().max(100).required(),
			password:   Joi.string().min(3).max(100).required()
		}
	},
	register: {
		body: {
			name:       Joi.string().max(100).required(),
			email:      Joi.string().email().max(100).required(),
			password:   Joi.string().min(3).max(100).required(),
			company:    Joi.string().max(100).required()
		}
	}
}