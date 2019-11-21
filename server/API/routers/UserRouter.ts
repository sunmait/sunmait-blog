import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IUserService, IPostService } from '../../Domain/Services';
import { CheckAuth } from '../middlewares/CheckAuth';
import { IAuthorizedRequest } from '../helper/IAuthorizedRequest';

const router = express.Router();
const userService = container.get<IUserService>('UserService');
const postService = container.get<IPostService>('PostService');
/**
 * @swagger
 * /api/users/:
 *  get:
 *    tags:
 *      - user
 *    summary: Get all users
 *    description: Use to get all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.json(await userService.getUsers());
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    tags:
 *       - user
 *    summary: Get info about user
 *    description: Use to get info about user by id
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: id of user
 *    responses:
 *      '200':
 *        description: A successful response
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
 * @swagger
 * /api/users/{id}/posts:
 *  get:
 *    tags:
 *      - user
 *    summary: Get all posts of user
 *    description: Use to get all posts of user by id
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: userId
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id/posts', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id: userId } = req.params;
  const { count, offset, search, tag } = req.query;

  try {
    res.json(
      await postService.getPosts({
        userId,
        count,
        offset,
        search,
        tag,
      })
    );
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users/:
 *  patch:
 *   tags:
 *     - user
 *   summary: Change user info
 *   parameters:
 *   - name: Authorization
 *     in: header
 *     description: an authorization header "Bearer 'access token'"
 *     required: true
 *     type: string
 *     value: Bearer
 *   - name: data
 *     in: body
 *     description: data to update
 *     required: true
 *     schema:
 *         type: object
 *         properties:
 *                     FirstName:
 *                       type: string
 *                       required: false
 *                     LastName:
 *                       type: string
 *                       required: false
 *                     BornDate:
 *                       type: string
 *                       required: false
 *                     PhotoUrl:
 *                       type: string
 *                       required: false
 *                     Login:
 *                       type: string
 *                       required: false
 *   description: Use to update user info in DB (you should be authorized)
 *   responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 */
router.patch('/', CheckAuth, async (req: IAuthorizedRequest, res: express.Response, next: express.NextFunction) => {
  const {
    user: { id },
  } = req;
  const data = req.body;

  try {
    res.json(await userService.updateUser(id, data));
  } catch (error) {
    next(error);
  }
});

export default router;
