import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import Profile from '../profile/profile.container';
import NotFound from '../404/404.container';

export default (
	<div>
		<Route path="profile" component={Profile}/>
	</div>
);