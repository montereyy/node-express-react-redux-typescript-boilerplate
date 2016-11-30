import Joi from 'joi';

export default {
	get: {
		params: {
			email:      Joi.number().integer().required()
		}
	}
}