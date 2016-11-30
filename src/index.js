import app from 'app/app';
import dotEnv from 'dotenv';
import morgan from 'morgan';
import db from 'app/base/db';

dotEnv.load();

if(process.env.ENV === 'dev') {
	app.use(morgan('dev'));
}

db()
	.then(() => {
		app.listen(process.env.PORT || process.env.APP_PORT, function() {
			console.log('API listening on port 3000!')
		});
	});
