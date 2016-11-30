import BaseTransformer from 'app/transformers/base';

class UserTransformer extends BaseTransformer {

	transform(user) {
		return {
			id:         user.id,
			name:       user.name,
			email:      user.email,
			company:    user.company,
			isAdmin:    !!user.isAdmin
		}
	}
}

export default new UserTransformer();