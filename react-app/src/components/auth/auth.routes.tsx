import * as React from 'react';
import {Route, IndexRedirect} from 'react-router';
import Auth from './auth.container';
import Login from '../login/login.container';
import Register from '../register/register.container';
import AuthMiddleware from '../../middlewares/auth.middleware';

export default (
	<Route path="/auth" component={Auth} onEnter={AuthMiddleware.isNotAuthenticated}>
		<IndexRedirect to="login"/>
		<Route path="register" component={Register} />
		<Route path="login" component={Login} />
	</Route>
);