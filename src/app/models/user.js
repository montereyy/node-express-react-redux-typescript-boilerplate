import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import increment from 'mongoose-sequence';
import unique from 'mongoose-unique-validator';

class UserConfig {

	static bcryptSaltRounds = 10;

	static preSave(next) {
		let user = this;

		if(!user.isModified('password')) {
			return next();
		}

		bcrypt.hash(user.password, UserConfig.bcryptSaltRounds, _.bind(UserConfig._handleHashCreated, user, next))
	}

	static _handleHashCreated(next, error, hash) {
		if(error) {
			throw error;
		}
		this.password = hash;
		next();
	}

	static isSamePassword(receivedPass, userPass, cb) {
		bcrypt.compare(receivedPass, userPass, (error, isSame) => {
			cb(error, isSame);
		});
	}
}

const User = new mongoose.Schema({
	name:       String,
	password:   String,
	email:      { type: String, unique: true },
	company:    String,
	isAdmin:    Boolean
});

User.plugin(increment, { inc_field: 'id' });
User.plugin(unique);

User.pre('save', UserConfig.preSave);
User.statics.isSamePassword = UserConfig.isSamePassword;

export default mongoose.model('User', User)