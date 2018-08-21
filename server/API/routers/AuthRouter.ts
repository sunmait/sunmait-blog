import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IAuthService } from '../../Domain/Services';

const router = express.Router();
const authService = container.get<IAuthService>('AuthService');

/**
 * Operations about authentification.
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await authService.authWithLoginAndPassword(data));
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/refresh/:refreshToken',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const refreshToken = req.params.refreshToken;

    try {
      res.json(await authService.refreshSession(refreshToken));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/verify-credentials', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await authService.verifyCredentials(data));
  } catch (error) {
    next(error);
  }
});

router.delete('/:refreshToken', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const refreshToken = req.params.refreshToken;

  try {
    res.json(await authService.logout(refreshToken));
  } catch (error) {
    next(error);
  }
});

export default router;
