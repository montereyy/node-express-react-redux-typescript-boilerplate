import * as React from 'react'
import {connect} from 'react-redux';
import FormError from '../formError/formError.container';
import Spinner from '../spinner/spinner.container';
import AuthHelper from './helpers/auth.helper';
import {} from 'react-router';
let autoBind = require('react-autobind');

class Auth extends React.Component<any, {}> {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	private _renderErrors(error) {
		return <FormError error={error} key={error.toString()}/>
	}

	componentDidUpdate() {
		let {user, token} = this.props.auth;
		if(token && user) {
			this._handleUserLoggedIn(user, token);
		}
	}

	_handleUserLoggedIn(user, token) {
		AuthHelper.updateUser(user);
		AuthHelper.updateToken(token);
		this.props.router.push(this.props.location.query.intended || '/');
	}

	render() {
		return (
			<div className="auth">
				{this.props.children}
				<Spinner active={this.props.auth.inflight} />
				<div className="errors">
					{this.props.auth.errors.map(this._renderErrors)}
				</div>
			</div>
		);
	}

	static mapStateToProps(state) {
		return {
			auth: state.auth
		}
	}
}

export default connect(Auth.mapStateToProps)(Auth);