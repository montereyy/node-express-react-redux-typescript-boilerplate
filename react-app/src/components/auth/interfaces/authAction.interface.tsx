import {Action} from 'redux';
import {User} from './user.interface';

export interface AuthAction extends Action {
	errors?: string[]
	token?: string
	user: User
}