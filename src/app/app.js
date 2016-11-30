import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import routes from 'app/routes';
import Api from 'app/base/api';
import FrontEndInitizlizer from './front-end.initializer';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(cors());
app.use(helmet());

FrontEndInitizlizer.init(app);

app.use('/api', routes);

let api = new Api();
app.use(api.validationHandler.bind(api));

export default app;