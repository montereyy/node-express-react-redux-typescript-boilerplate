import fs from 'fs';
import express from 'express';

class FrontInitializer {
	static reactPath = `${__dirname}/../../react-app/dist`;

	static init(app){
		FrontInitializer._initReact(app);
	}

	static _initReact(app){
		if(! fs.existsSync(FrontInitializer.reactPath)){
			throw new Error('Build react first');
		}

		app.use(express.static(FrontInitializer.reactPath));
		app.get('/', (req, res) => res.sendFile(`/index.html`));
	}


}

export default FrontInitializer;