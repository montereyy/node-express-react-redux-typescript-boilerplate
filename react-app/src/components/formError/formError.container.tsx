import * as React from 'react';
import FormErrorProps from './interfaces/formError.props.interface';

class FormError extends React.Component<FormErrorProps, {}> {

	render() {
		return (
			<div className="callout alert">
				{this.props.error}
			</div>
		)
	}
}

export default FormError;