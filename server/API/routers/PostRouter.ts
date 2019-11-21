import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IPostService, ICommentService, ITagService } from '../../Domain/Services';
import { CheckAuth } from '../middlewares/CheckAuth';
import { IAuthorizedRequest } from '../helper/IAuthorizedRequest';

const router = express.Router();
const postService = container.get<IPostService>('PostService');
const commentService = container.get<ICommentService>('CommentService');
const tagService = container.get<ITagService>('TagService');

/**
 * @swagger
 * /api/posts?count={count}&offset={offset}&search={search}&tag={tag}:
 *  get:
 *    tags:
 *      - posts
 *    summary: Get posts
 *    description: Use to get posts
 *    parameters:
 *     - name: count
 *       in: path
 *       type: number
 *       required: true
 *     - name: offset
 *       in: path
 *       type: number
 *       required: true
 *     - name: search
 *       in: path
 *       type: string
 *       required: true
 *     - name: tag
 *       in: path
 *       type: array
 *       required: true
 *       items:
 *           type: string
 *           required: false
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad request
 */
router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { count, offset, search, tag } = req.query;

  try {
    res.json(await postService.getPosts({ count, offset, search, tag }));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *    tags:
 *      - posts
 *    summary: Get post by id
 *    description: Use to get post by id
 *    parameters:
 *     - name: id
 *       in: path
 *       type: number
 *       required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad request
 */
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  try {
    res.json(await postService.getPostById(id));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/posts/{id}/comments:
 *  get:
 *    tags:
 *      - posts
 *    summary: Get comments of post by id
 *    description: Use to get comments of post by id
 *    parameters:
 *     - name: id
 *       in: path
 *       type: number
 *       required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad request
 */
router.get('/:id/comments', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  try {
    res.json(await commentService.getCommentsById(id));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/posts/{id}/likes:
 *  post:
 *    tags:
 *      - posts
 *    summary: Like post
 *    description: Use to like post
 *    parameters:
 *    - name: Authorization
 *      in: header
 *      description: an authorization header "Bearer 'access token'"
 *      required: true
 *      type: string
 *      value: Bearer
 *    - name: id
 *      in: path
 *      type: number
 *      required: true
 *    - name: UserId
 *      in: body
 *      schema:
 *        type: object
 *        required: true
 *        properties:
 *           UserId:
 *             type: number
 *             required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.post(
  '/:id/likes',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const UserId = req.body.UserId;
    const PostId = req.params.id;
    const UserInfo = req.body.UserInfo;
    try {
      res.json(await postService.likeOrDislike(PostId, UserId, UserInfo));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/posts/{id}/rating:
 *  post:
 *    tags:
 *      - posts
 *    summary: Set post rating by id
 *    description: Use post to set rating by id
 *    parameters:
 *    - name: Authorization
 *      in: header
 *      description: an authorization header "Bearer 'access token'"
 *      required: true
 *      type: string
 *      value: Bearer
 *    - name: id
 *      in: path
 *      type: number
 *      required: true
 *    - name: UserId
 *      in: body
 *      schema:
 *        type: object
 *        required: true
 *        properties:
 *           Value:
 *             type: number
 *             required: true
 *           UserId:
 *             type: number
 *             required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.post(
  '/:id/rating',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { Value, UserId } = req.body;
    const PostId = req.params.id;
    try {
      res.json(await postService.setRating(PostId, UserId, Value));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/posts/{id}/averagePost:
 *  post:
 *    tags:
 *      - posts
 *    summary: Get average post rating by id
 *    description: Use to get average post rating by id
 *    parameters:
 *    - name: id
 *      in: path
 *      type: number
 *      required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad request
 */
router.post('/:id/averagePost', async (req: express.Request, res: express.Response) => {
  try {
    res.json(await postService.setAveragePostRating(req.params.id));
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /api/posts/{id}/getUserPostRating:
 *  post:
 *    tags:
 *      - posts
 *    summary: Get user post rating by id
 *    description: Use to get user post rating by id
 *    parameters:
 *    - name: Authorization
 *      in: header
 *      description: an authorization header "Bearer 'access token'"
 *      required: true
 *      type: string
 *      value: Bearer
 *    - name: id
 *      in: path
 *      type: number
 *      description: postId
 *      required: true
 *    - name: userId
 *      in: body
 *      schema:
 *        type: object
 *        required: true
 *        properties:
 *           user:
 *             type: number
 *             description: UserId
 *             required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.post(
  '/:id/getUserPostRating',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      res.json(await postService.setUserPostRating({ post: req.params.id, user: req.body.user }));
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @swagger
 * /api/posts/{id}/tag:
 *  get:
 *    tags:
 *      - posts
 *    summary: Get tag by his id
 *    description: Use to get tag by his id
 *    parameters:
 *    - name: id
 *      in: path
 *      type: number
 *      required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad request
 */
router.get('/:id/tag', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  try {
    res.json(await tagService.getTag(id));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/posts/:
 *  post:
 *    tags:
 *      - posts
 *    summary: Add post
 *    description: Use to add post
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: about post
 *       in: body
 *       required: true
 *       schema:
 *          type: object
 *          properties:
 *              UserId:
 *                type: number
 *                required: true
 *              Tags:
 *                type: array
 *                items:
 *                  type: object
 *                  required: true
 *                  properties:
 *                    Text:
 *                      type: string
 *                      required: true
 *              Description:
 *                type: string
 *                required: true
 *              Title:
 *                type: string
 *                required: true
 *              ImageUrl:
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
router.post('/', CheckAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await postService.addPost(data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/posts/:
 *  patch:
 *    tags:
 *      - posts
 *    summary: Update post info
 *    description: Use to update post info
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: about post
 *       in: body
 *       required: true
 *       schema:
 *          type: object
 *          properties:
 *              idPost:
 *                type: number
 *                required: true
 *              userId:
 *                type: number
 *                required: true
 *              Tags:
 *                type: array
 *                items:
 *                  type: object
 *                  required: true
 *                  properties:
 *                    Text:
 *                      type: string
 *                      required: true
 *              Description:
 *                type: string
 *                required: true
 *              Title:
 *                type: string
 *                required: true
 *              ImageUrl:
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
router.patch('/', CheckAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await postService.updatePost(data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *    tags:
 *      - posts
 *    summary: Delete post by id
 *    description: Use to delete post by id
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: id
 *       in: path
 *       type: string
 *       required: true
 *       description: postId
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.delete('/:id', CheckAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  try {
    res.json(await postService.deletePost(id));
  } catch (error) {
    next(error);
  }
});

export default router;
