import UtilHelper from './util.helper';

class Binder {

	static initInput(self, key, event) {
		let newState = {};
		newState[key] = event.target.value;

		self.setState(Object.assign({}, self.state, newState));
	}

	static initInputArray(self, keys, event) {
		let newState = {};
		UtilHelper.setValueIn(newState, keys, event.target.value);

		self.setState(Object.assign({}, self.state, newState));
	}
}

export default Binder;