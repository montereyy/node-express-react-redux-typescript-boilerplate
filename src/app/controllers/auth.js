import User from 'app/models/user';
import _ from 'underscore';
import ApiController from 'app/base/api';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import UserTransformer from 'app/transformers/user';

class AuthController extends ApiController {

	login(req, res) {
		User
			.findOne({
				email: req.body.email
			})
			.lean()
			.then(user => {
				if(!user) {
					this.respondBadRequest(res, 'Bad credentials');
					return;
				}
				User.isSamePassword(req.body.password, user.password, _.bind(this._loginHandler, this, res, user));
			});
	}

	_loginHandler(res, user, error, authorized) {
		if(error) {
			this.respondWithError(res, 'Token is not correct.', httpStatus.UNAUTHORIZED);
		}
		if(!authorized) {
			this.respondBadRequest(res, 'Bad credentials');
		} else {
			this.respondSuccess(res, {
				user:   UserTransformer.transform(user),
				token:  jwt.sign(user, process.env.JWT_SECRET)
			});
		}
	}

	register(req, res) {
		let params      = ['email', 'name', 'company', 'password'];
		let userData    = _.reduce(params, (memo, param) => {
			memo[param] = req.body[param];
			return memo;
		}, {});
		let user        = new User(userData);

		user
			.save()
			.then(_user => this._loginHandler(res, _user, false, true))
			.catch(this._handleMongoErrors.bind(this, res));
	}
}

export default new AuthController();