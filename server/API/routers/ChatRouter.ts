import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IChatService } from '../../Domain/Services';
import { CheckAuth } from '../middlewares/CheckAuth';

const router = express.Router();
const chatService = container.get<IChatService>('ChatService');

/**
 * @swagger
 * /api/chat/{id}&{count}&{offset}:
 *  get:
 *    tags:
 *      - chat
 *    summary: Get all user chats by id
 *    description: Use to Get all user chats by id
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
 *       description: UserId
 *     - name: count
 *       in: path
 *       required: true
 *       description: Max count chats
 *     - name: offset
 *       in: path
 *       required: true
 *       description: Offset
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.get(
  '/:id&:count&:offset',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, count, offset } = req.params;
    try {
      res.json(await chatService.getUserChats({ userId: id, count, offset }));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/chat/{user1}/{user2}/{count}&{offset}:
 *  get:
 *    tags:
 *      - chat
 *    summary: Get messages with idTo
 *    description: Use to get messages with idTo
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: user1
 *       in: path
 *       required: true
 *       description: user1 id
 *     - name: user2
 *       in: path
 *       required: true
 *       description: user2 id
 *     - name: count
 *       in: path
 *       required: true
 *       description: Max count messages chats
 *     - name: offset
 *       in: path
 *       required: true
 *       description: Offset
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.get(
  '/:user1/:user2/:count&:offset',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { user1, user2, count, offset } = req.params;
    try {
      res.json(await chatService.getMessages({ user1, user2, count, offset }));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/chat/{userFrom}/{userTo}:
 *  put:
 *    tags:
 *      - chat
 *    summary: Send message to idTo
 *    description: Use to send message to idTo
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: userFrom
 *       in: path
 *       required: true
 *       description: userFrom id
 *     - name: userTo
 *       in: path
 *       required: true
 *       description: userTo id
 *     - name: message
 *       in: body
 *       schema:
 *         type: object
 *         required: true
 *         properties:
 *            message:
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
router.put(
  '/:userFrom/:userTo',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      res.json(
        await chatService.newMessage({
          UserFrom: req.params.userFrom,
          UserTo: req.params.userTo,
          Message: req.body.message,
        })
      );
    } catch (error) {
      next(error);
    }
  }
);

/**
 * statuses: from: sent, updated, deleted
 *           to: got, deleted
 */

/**
 * @swagger
 * /api/chat/{messageId}:
 *  patch:
 *    tags:
 *      - chat
 *    summary:  Update message
 *    description: Use to update message (status or/and message)
 *    parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header "Bearer 'access token'"
 *       required: true
 *       type: string
 *       value: Bearer
 *     - name: messageId
 *       in: path
 *       required: true
 *       description: messageId
 *     - name: message
 *       in: body
 *       schema:
 *         type: object
 *         required: true
 *         properties:
 *            toStatus:
 *              type: string
 *              required: false
 *            fromStatus:
 *              type: string
 *              required: false
 *            Message:
 *              type: string
 *              required: false
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.patch('/:messageId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.json(
      await chatService.updateStatusMessage({
        id: req.params.messageId,
        toStatus: req.body.toStatus,
        fromStatus: req.body.fromStatus,
        Message: req.body.Message,
      })
    );
  } catch (error) {
    next(error);
  }
});

export default router;
