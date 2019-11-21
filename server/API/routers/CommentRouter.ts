import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { ICommentService } from '../../Domain/Services';
import { CheckAuth } from '../middlewares/CheckAuth';

const router = express.Router();
const commentService = container.get<ICommentService>('CommentService');

/**
 * Operations about Comments.
 *
 * Add comment
 */

/**
 * @swagger
 * /api/comments/:
 *  post:
 *    tags:
 *      - comments
 *    summary: Add comment
 *    description: Use to add comment
 *    parameters:
 *    - name: Authorization
 *      in: header
 *      description: an authorization header "Bearer 'access token'"
 *      required: true
 *      type: string
 *      value: Bearer
 *    - name: aboutComment
 *      in: body
 *      schema:
 *         type: object
 *         required: true
 *         properties:
 *            Text:
 *              type: string
 *              required: true
 *            UserId:
 *              type: number
 *              required: true
 *            PostId:
 *              type: number
 *              required: true
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
    res.json(await commentService.addComment(data));
  } catch (error) {
    next(error);
  }
});

/**
 * Get Comments
 */
/**
 * @swagger
 * /api/comments/{postId}:
 *  get:
 *    tags:
 *      - comments
 *    summary: Get all comments of post
 *    description: Use to get all comments of post
 *    parameters:
 *     - name: postId
 *       in: path
 *       type: string
 *       required: true
 *       description: postId
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad request
 */
router.get('/:postId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.params.postId;
  try {
    res.json(await commentService.getCommentsById(data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/comments/{id}:
 *  patch:
 *    tags:
 *      - comments
 *    summary: Change comment by id
 *    description: Use to change comment by id
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: id
 *       in: path
 *       required: true
 *       description: comment id
 *     - name: description
 *       in: body
 *       schema:
 *         type: object
 *         required: true
 *         properties:
 *            description:
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
router.patch('/:id', CheckAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id;
  const { description } = req.body;

  try {
    res.json(await commentService.updateComment(id, description));
  } catch (error) {
    next(error);
  }
});

/**
 * Delete comment
 * id: comment's id
 */

/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *    tags:
 *      - comments
 *    summary: Delete comment by id
 *    description: Use to delete comment by id
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: id
 *       in: path
 *       required: true
 *       description: comment id
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.delete('/:id', CheckAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id;

  try {
    res.json(await commentService.deleteComment(id));
  } catch (error) {
    next(error);
  }
});

export default router;
