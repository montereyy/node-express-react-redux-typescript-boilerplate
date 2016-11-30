import httpStatus from 'http-status';
import Validator from 'express-validation';
import _ from 'underscore';

class Api {

	validationHandler(err, req, res, next) {
		if(err instanceof Validator.ValidationError) {
			this.respondBadRequest(res, _.flatten(_.pluck(err.errors, 'messages')));
		} else {
			res.status(httpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	respond(response, data, code) {
		code = code || data.code || httpStatus.INTERNAL_SERVER_ERROR;

		response.status(code).json(data);
	}

	respondWithError(response, error, code) {
		this.respond(
			response,
			{
				error,
				code
			},
			code
		)
	}

	respondUnauthorized(response) {
		this.respondWithError(
			response,
			'You are not authorized to perform this action.',
			httpStatus.UNAUTHORIZED
		)
	}

	respondBadRequest(response, error) {
		this.respondWithError(
			response,
			error,
			httpStatus.BAD_REQUEST
		)
	}

	respondSuccess(response, data) {
		let code = httpStatus.OK;
		this.respond(
			response,
			{
				data,
				code
			},
			code
		)
	}

	_handleMongoErrors(res, errors) {
		this.respondBadRequest(res, _.reduce(errors.errors, (memo, item) => {
			memo.push(item.message);
			return memo;
		}, []).join(', '));
		console.log(errors)
	}

}

export default Api;