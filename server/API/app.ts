import * as bodyParser from 'body-parser';
import * as express from 'express';

import { container } from './infrastructure/di/Container';
import { DbContext } from '../Data/DbContext';
import ErrorHandler from './middlewares/ErrorHandler';
import api from './routers';

const dbContext = container.get<DbContext>('DbContext');

(async () => {
  try {
    await dbContext.connect();

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/api', api);

    app.use(ErrorHandler);

    app.listen(3000);
  } catch (err) {
    console.error(err);
  }
})();
