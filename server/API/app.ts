import bodyParser = require('body-parser');

import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import './controllers/index';
import { AllInstaller } from './infrastructure/di/AllInstaller';
import { DbContext } from '../Data/DbContext';
import ErrorHandler from './middlewares/ErrorHandler';

// set up container
const container = new Container();

const allInstaller = new AllInstaller(container);
allInstaller.install();

const dbContext = container.get<DbContext>('DbContext');

(async () => {
  try {
    await dbContext.connect();

    // create server
    const server = new InversifyExpressServer(container);

    server.setConfig(application => {
      application.use(bodyParser.urlencoded({ extended: false }));
      application.use(bodyParser.json());
    });

    const app = server.build();
    app.use(ErrorHandler);

    app.listen(3000);
  } catch (err) {
    console.error(err);
  }
})();
