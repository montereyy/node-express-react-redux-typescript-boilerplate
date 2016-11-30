import * as axios from 'axios';
import AuthHelper from '../components/auth/helpers/auth.helper';
import appConfig from '../components/app/app.config';

class Http {
	static decorateAxios() {
		axios.interceptors.request.use(Http.requestJwtInterceptor);
		axios.interceptors.response.use(null, Http.responseUnauthorizedInterceptor);
	}

	private static requestJwtInterceptor(config) {
		let token = AuthHelper.getToken();
		if (token) {
			config.headers['Authorization'] = `${appConfig.jwtKey} ${token}`;
		}

		return config;
	}

	private static responseUnauthorizedInterceptor(error) {
		if (error.response.status === 401) {
			AuthHelper.logout();
		}
		return Promise.reject(error);
	}

}

export default Http;