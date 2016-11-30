import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

export default () => {
	return mongoose
		.connect(process.env.DB)
		.catch(error => {
			console.log('Error during db connection');
			console.log(error);
		});
}