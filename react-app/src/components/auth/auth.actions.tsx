import * as axios from 'axios';
import * as _ from 'underscore';
import UtilHelper from '../../helpers/util.helper';
import {AuthAction} from './interfaces/authAction.interface';
import AuthHelper from './helpers/auth.helper';
import {User} from './interfaces/user.interface';

export enum authActions {
	AUTH_STARTED,
	AUTH_FAIL,
	AUTH_SUCCESS,
	AUTH_RESET,
	USER_EXTRACT,
	USER_EXTRACT_SUCCESS
}

export class AuthActionsCreators {

	static processLogin(data: {}) {
		return AuthActionsCreators.processAuth('auth/login', data);
	}

	static processRegister(data: {}) {
		return AuthActionsCreators.processAuth('auth/register', data);
	}

	private static processAuth(path: string, data: {}) {
		return dispatch => {
			dispatch(AuthActionsCreators.authStarted());

			axios
				.post(
					UtilHelper.apiPrefixed(path),
					data
				)
				.then((response: any) => dispatch(AuthActionsCreators.authSuccess(response.data.data)))
				.catch(error => dispatch(AuthActionsCreators.authFailed(error.response.data.error)))
		}
	}

	static resetAuth() {
		return {
			type: authActions.AUTH_RESET
		}
	}

	private static authStarted(): {} {
		return {
			type: authActions.AUTH_STARTED
		}
	}

	private static authFailed(errors: string[] | string): {} {
		if (!_.isArray(errors)) errors = [errors];

		return {
			type: authActions.AUTH_FAIL,
			errors
		}
	}

	private static authSuccess(data: AuthAction): {} {
		return {
			type:  authActions.AUTH_SUCCESS,
			token: data.token,
			user:  data.user
		}
	}

	static extractUser() {
		return dispatch => {
			dispatch(AuthActionsCreators.userExtracting());

			axios
				.get(UtilHelper.apiPrefixed('users/profile'))
				.then((response: any) => dispatch(AuthActionsCreators.userExtractSuccess(response.data.data)));
		}
	}

	private static userExtracting() {
		return {
			type:  authActions.USER_EXTRACT,
			token: AuthHelper.getToken()
		}
	}

	private static userExtractSuccess(user: User) {
		return {
			type: authActions.USER_EXTRACT_SUCCESS,
			user
		}
	}
}