import * as React from 'react';
import {connect} from 'react-redux';

class Profile extends React.Component<any, {}> {
	render() {
		return (
			<div>
				<table>
					<tbody>
					<tr>
						<td>Id</td>
						<td>{this.props.user.id}</td>
					</tr>
					<tr>
						<td>Name</td>
						<td>{this.props.user.name}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{this.props.user.email}</td>
					</tr>
					<tr>
						<td>Is admin</td>
						<td>{this.props.user.isAdmin ? 'Yes' : 'No'}</td>
					</tr>
					<tr>
						<td>Company</td>
						<td>{this.props.user.company}</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}

	static mapStateToProps(state) {
		return {
			user: state.auth.user
		}
	}
}

export default connect(Profile.mapStateToProps)(Profile);