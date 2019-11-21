import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IAuthService } from '../../Domain/Services';
import { CheckAuth } from '../middlewares/CheckAuth';

const router = express.Router();
const authService = container.get<IAuthService>('AuthService');

/**
 * Operations about authentification.
 */

/**
 * @swagger
 * /api/auth:
 *  post:
 *    tags:
 *      - auth
 *    summary: Authorization login + password
 *    description: Use to authorizate
 *    parameters:
 *    - name: authorization
 *      in: body
 *      schema:
 *         type: object
 *         required: true
 *         properties:
 *            Login:
 *              type: string
 *              required: true
 *            Password:
 *              type: string
 *              required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;
  try {
    res.json(await authService.authWithLoginAndPassword(data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/refresh/{refreshToken}:
 *  patch:
 *    tags:
 *      - auth
 *    summary: Refresh refreshToken
 *    description: Use to refresh refreshToken
 *    parameters:
 *     - in: path
 *       name: refreshToken
 *       required: true
 *       description: refreshToken
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */

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

/**
 * @swagger
 * /api/auth/verify-credentials:
 *  patch:
 *    tags:
 *      - auth
 *    summary: Verify credentials
 *    description: Use to check access and refresh tokens
 *    parameters:
 *     - name: credentials
 *       in: body
 *       required: true
 *       schema:
 *          type: object
 *          properties:
 *              accessToken:
 *                type: string
 *                required: true
 *              refreshToken:
 *                type: string
 *                required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */

router.patch('/verify-credentials', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await authService.verifyCredentials(data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/change-password:
 *  patch:
 *    tags:
 *      - auth
 *    summary: Change password
 *    description: Use to change password
 *    parameters:
 *     - name: passwords
 *       in: body
 *       required: true
 *       schema:
 *          type: object
 *          properties:
 *              accessToken:
 *                type: string
 *                required: true
 *              password:
 *                type: string
 *                required: true
 *              newPassword:
 *                type: string
 *                required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.patch('/change-password', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await authService.changePassword(data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/{refreshToken}:
 *  delete:
 *    tags:
 *      - auth
 *    summary: Delete refresh token
 *    description: Use to delete refresh token
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: refreshToken
 *       in: path
 *       required: true
 *       description: refreshToken
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */

router.delete(
  '/:refreshToken',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const refreshToken = req.params.refreshToken;

    try {
      res.json(await authService.logout(refreshToken));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
