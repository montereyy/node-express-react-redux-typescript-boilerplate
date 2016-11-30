import {Reducer} from 'redux';
import {AppState} from '../app/interfaces/app.state.interface';
import {authActions} from './auth.actions';
import {AuthAction} from './interfaces/authAction.interface';
import {AppStateClass} from '../app/classes/app.state.class';
import {Auth} from './interfaces/auth.interface';
import {AuthClass} from './classes/auth.class';

export const authReducer: Reducer<Auth> = (state: Auth = new AuthClass(), action: AuthAction) => {
	switch (action.type) {
		case authActions.AUTH_STARTED:
			return Object.assign({}, state, { inflight: true });
		case authActions.AUTH_FAIL:
			return Object.assign({}, state, { errors: action.errors, inflight: false });
		case authActions.AUTH_SUCCESS:
			return Object.assign({}, state, { inflight: false, token: action.token, user: action.user });
		case authActions.AUTH_RESET:
			return Object.assign({}, state, { inflight: false, errors: [] });
		case authActions.USER_EXTRACT:
			return Object.assign({}, state, { inflight: true, token: action.token });
		case authActions.USER_EXTRACT_SUCCESS:
			return Object.assign({}, state, { inflight: false, user: action.user });
		default:
			return state;
	}
};