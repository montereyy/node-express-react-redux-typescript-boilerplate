import RegisterState from '../interfaces/registerState.interface';

class RegisterStateClass implements RegisterState {
	email: string;
	password: string;
	name: string;
	company: string;

	constructor() {
		this.email    = '';
		this.password = '';
		this.name     = '';
		this.company  = '';
	}
}

export default RegisterStateClass;