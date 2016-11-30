import _ from 'underscore';
import Util from 'app/base/util';

class BaseTransformer {

	transformCollection(items) {
		return _.reduce(items, (memo, item) => {
			memo.push(this.transform(item));
			return memo;
		}, []);
	}

	transform() {
		Util.abstractMethod('transform');
	}
}

export default BaseTransformer;