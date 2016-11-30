import {User} from './user.interface';

export interface Auth {
	inflight: boolean
	errors: string[]
	user: User
}