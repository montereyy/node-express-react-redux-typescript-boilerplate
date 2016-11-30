import Api from 'app/base/api'
import passport from 'passport';
import jwt from 'passport-jwt';
import dotEnv from 'dotenv';
import User from '../models/user';

dotEnv.load();

class AuthMiddleware {

	constructor() {
		this._initJwtStrategy();
	}

	jwt() {
		return passport.authenticate('jwt', { session : false });
	}

	_initJwtStrategy() {
		let strategy = new jwt.Strategy(
			{
				secretOrKey:    process.env.JWT_SECRET,
				jwtFromRequest: jwt.ExtractJwt.fromAuthHeader()
			},
			AuthMiddleware._jwtHandler
		);

		passport.use(strategy);
	}

	static _jwtHandler(user, done) {
		if(user) {
			let id = user.id;
			if(user._doc) {
				id = user._doc.id;
			}

			User
				.findOne({ id })
				.then(user => {
					done(null, user)
				});
		}
		else {
			done(new Error("User not found"), null);
		}
	}
}

export default new AuthMiddleware();