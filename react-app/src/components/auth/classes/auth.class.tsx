import {Auth} from '../interfaces/auth.interface';
import {UserClass} from './user.class';

export class AuthClass implements Auth {
	user: UserClass;
	inflight: boolean;
	errors: string[];

	constructor() {
		this.user     = new UserClass();
		this.inflight = false;
		this.errors   = [];
	}
}