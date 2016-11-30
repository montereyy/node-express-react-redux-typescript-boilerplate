import * as React from 'react';
import RegisterState from './interfaces/registerState.interface';
import RegisterStateClass from './classes/registerState.class';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Binder from '../../helpers/binder.helper';
import {AuthActionsCreators} from '../auth/auth.actions';
let autoBind = require('react-autobind');

class Register extends React.Component<any, RegisterState> {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentWillMount() {
		this.setState(this._getInitialState());
		this.props.dispatch(AuthActionsCreators.resetAuth());
	}

	private _getInitialState() {
		return new RegisterStateClass();
	}

	private handleRegister(event) {
		event.preventDefault();
		this.props.dispatch(AuthActionsCreators.processRegister(this.state));
	}

	render() {
		return (
			<div className="login">
				<form onSubmit={this.handleRegister} className="auth-form">
					<label> Email
						<input type="email" value={this.state.email}
						       onChange={Binder.initInput.bind({}, this, 'email',)} required />
					</label>
					<label> Password
						<input type="password" value={this.state.password}
						       onChange={Binder.initInput.bind({}, this, 'password',)} required />
					</label>
					<label> Name
						<input type="text" value={this.state.name}
						       onChange={Binder.initInput.bind({}, this, 'name',)} required />
					</label>
					<label> Company
						<input type="text" value={this.state.company}
						       onChange={Binder.initInput.bind({}, this, 'company',)} required />
					</label>
					<div className="controls">
						<button className="success button">Register</button>
						<Link to="/auth/login">
							<button className="warning button">Login</button>
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

export default connect(Register.mapStateToProps)(Register);