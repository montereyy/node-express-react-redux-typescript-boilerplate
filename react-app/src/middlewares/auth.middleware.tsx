import LocalStorage from '../helpers/localStorage.helper';
import AuthHelper from '../components/auth/helpers/auth.helper';

class AuthMiddleware {

	static isAuthenticated(nextState, replace) {
		if(!AuthMiddleware._userIdentifierExists()) {
			replace({
				pathname: '/auth/login',
				query: { intended: nextState.location.pathname }
			});
		}
	}

	static isNotAuthenticated(nextState, replace) {
		if(AuthMiddleware._userIdentifierExists()) {
			replace('/');
		}
	}

	private static _userIdentifierExists(): boolean {
		return !!AuthHelper.getToken();
	}
}

export default AuthMiddleware;