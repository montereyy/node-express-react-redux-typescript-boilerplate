import {AppState} from '../interfaces/app.state.interface';
import {AuthClass} from '../../auth/classes/auth.class';

export class AppStateClass implements AppState {
	auth: AuthClass;

	constructor() {
		this.auth = new AuthClass();
	}
}