import LocalStorage from '../../../helpers/localStorage.helper';

class AuthHelper {
	static logout() {
		LocalStorage.remove('token');
		LocalStorage.remove('user');
		location.reload();
	}

	static updateUser(user) {
		LocalStorage.update('user', user);
	}

	static updateToken(token) {
		LocalStorage.update('token', token);
	}

	static getToken() {
		return LocalStorage.get('token');
	}

	static getUser() {
		return LocalStorage.get('user');
	}
}

export default AuthHelper;