import * as React from 'react';
import AuthHelper from '../auth/helpers/auth.helper';
import {Link} from 'react-router';

class Header extends React.Component<any, {}> {
	logout() {
		AuthHelper.logout();
	}

	render() {
		return (
			<div className="header">
				<div className="left float-left">
					<ul className="menu">
						<li><Link to="/">Home</Link></li>
						<li><Link to="profile">Profile</Link></li>
						{this.props.user.isAdmin ? <li><Link to="users">Users</Link></li> : ''}
						<li><a onClick={this.logout}>Logout</a></li>
					</ul>
				</div>
				<div className="right float-right">
					Hello {this.props.user.name}
				</div>
			</div>
		);
	}
}

export default Header;