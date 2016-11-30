import ApiController from 'app/base/api';
import UserTransformer from 'app/transformers/user';
import User from 'app/models/user';

class UsersController extends ApiController {

	list(req, res) {
		User
			.find()
			.then(users => {
				this.respondSuccess(res, UserTransformer.transformCollection(users));
			});
	}

	profile(req, res) {
		this.respondSuccess(res, UserTransformer.transform(req.user));
	}

	get(req, res) {
		User
			.findOne({ id: req.params.id })
			.then(user => {
				this.respondSuccess(res, UserTransformer.transform(user));
			});
	}

	unSecured(req, res) {
		res.json('Unsecured route');
	}
}

export default new UsersController();