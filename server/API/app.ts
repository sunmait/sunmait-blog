import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import api from './routers';
import ErrorHandler from './middlewares/ErrorHandler';
import { container } from './infrastructure/di/Container';
import { DbContext } from '../Data/DbContext';
import { ISettingsProvider } from './infrastructure';

const dbContext = container.get<DbContext>('DbContext');
const settingsProvider = container.get<ISettingsProvider>('SettingsProvider');

(async () => {
  try {
    await dbContext.connect();

    const app = express();
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    const STATIC_PATH = path.join(__dirname, '../../client/build');

    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'SunMait Blog server API',
          description: 'API Information',
          contact: {
            name: 'Amazing Developer',
          },
          servers: ['http://localhost:5000'],
          tags: {
            name: 'auth',
            description: 'Everything about your Pets',
          },
        },
      },
      apis: ['API/app.ts', 'API/routers/*.ts'],
    };
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(STATIC_PATH));
    app.use('/api', api);
    app.get('*', (_req: express.Request, res: express.Response) => {
      res.sendFile(`${STATIC_PATH}/index.html`);
    });

    app.use(ErrorHandler);

    server.listen(settingsProvider.getPort());
    io.on('connection', socket => {
      socket.emit('news', { hello: 'world' });
      socket.on('new message', data => {
        console.log(data);
      });
    });
  } catch (err) {
    console.error(err);
  }
})();
