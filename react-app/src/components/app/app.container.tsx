import * as React from 'react'
import {connect} from 'react-redux';
import {AuthActionsCreators} from '../auth/auth.actions';
import Header from '../header/header.container';

class App extends React.Component<any, {}> {

	componentWillMount() {
		this.props.dispatch(AuthActionsCreators.extractUser());
	}

	render() {
		return (
			<div className="app">
				<Header user={this.props.auth.user}/>
				{this.props.children}
			</div>
		);
	}

	static mapPropsToState(state) {
		return state;
	}
}

export default connect(App.mapPropsToState)(App);