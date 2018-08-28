import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { container } from './infrastructure/di/Container';
import { DbContext } from '../Data/DbContext';
import ErrorHandler from './middlewares/ErrorHandler';
import api from './routers';
import {ISettingsProvider} from './infrastructure';

const dbContext = container.get<DbContext>('DbContext');
const settingsProvider = container.get<ISettingsProvider>('SettingsProvider');

(async () => {
  try {
    await dbContext.connect();

    const app = express();
    const STATIC_PATH = path.join(__dirname, '../../client/build');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(STATIC_PATH));

    app.use('/api', api);

    app.get('*', (_req: express.Request, res: express.Response) => {
      res.sendFile(`${STATIC_PATH}/index.html`);
    });

    app.use(ErrorHandler);

    app.listen(settingsProvider.getPort());
  } catch (err) {
    console.error(err);
  }
})();
