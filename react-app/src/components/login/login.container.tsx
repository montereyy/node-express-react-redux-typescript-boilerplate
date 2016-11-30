import * as React from 'react';
import {connect} from 'react-redux';
import {LoginState} from './interfaces/loginState.interface';
import LoginStateClass from './classes/loginState.class';
import Binder from '../../helpers/binder.helper';
import {AuthActionsCreators} from '../auth/auth.actions';
import {Link} from 'react-router';
let autoBind = require('react-autobind');

class Login extends React.Component<any, LoginState> {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentWillMount() {
		this.setState(this._getInitialState());
		this.props.dispatch(AuthActionsCreators.resetAuth());
	}

	private _getInitialState() {
		return new LoginStateClass();
	}

	private handleLogin(event) {
		event.preventDefault();
		this.props.dispatch(AuthActionsCreators.processLogin(this.state));
	}

	render() {
		return (
			<div className="login">
				<form onSubmit={this.handleLogin} className="auth-form">
					<label> Email
						<input type="email" value={this.state.email}
						       onChange={Binder.initInput.bind({}, this, 'email',)} required />
					</label>
					<label> Password
						<input type="password" value={this.state.password}
						       onChange={Binder.initInput.bind({}, this, 'password',)} required />
					</label>
					<div className="controls">
						<button className="success button">Login</button>
						<Link to="/auth/register">
							<button className="warning button">Register</button>
						</Link>
					</div>
				</form>
			</div>
		);
	}

	static mapStateToProps(state) {
		return {
			auth: state.auth
		}
	}
}

export default connect(Login.mapStateToProps)(Login);