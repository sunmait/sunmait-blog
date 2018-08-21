import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IUserService } from '../../Domain/Services';

const router = express.Router();
const userService = container.get<IUserService>('UserService');

/**
 * Operations about users.
 *
 * Get users
 */
router.get('/', async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.json(await userService.getUsers());
  } catch (error) {
    next(error);
  }
});

/**
 * Get information about user
 */
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  try {
    res.json(await userService.getUser(id));
  } catch (error) {
    next(error);
  }
});

/**
 * Get all posts of user by id
 */

router.get('/:id/posts', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  try {
    res.json(await userService.getUserPosts(id));
  } catch (error) {
    next(error);
  }
});

/**
 * Updating user
 */
router.patch('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  const data = req.body;

  try {
    res.json(await userService.updateUser(id, data));
  } catch (error) {
    next(error);
  }
});

export default router;
