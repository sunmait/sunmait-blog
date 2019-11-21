import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { ITagService } from '../../Domain/Services';

import { CheckAuth } from '../middlewares/CheckAuth';

const router = express.Router();
const tagService = container.get<ITagService>('TagService');

/**
 * @swagger
 * /api/post-tags/:
 *  get:
 *    tags:
 *      - tags
 *    summary: Get all tags
 *    description: Use to get all tags
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad request
 */
router.get('/', async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.json(await tagService.getTags());
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/post-tags/{id}:
 *  get:
 *    tags:
 *      - tags
 *    summary: Get tag by id
 *    description: Use to get tag by id
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
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  try {
    res.json(await tagService.getTag(id));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/post-tags/:
 *  post:
 *    tags:
 *      - tags
 *    summary: Create new tag in DB
 *    description: Use to create new tag in DB
 *    parameters:
 *    - name: Authorization
 *      in: header
 *      description: an authorization header "Bearer 'access token'"
 *      required: true
 *      type: string
 *      value: Bearer
 *    - name: tag's text
 *      in: body
 *      required: true
 *      schema:
 *         type: object
 *         properties:
 *             Text:
 *               type: string
 *               required: true
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
    res.json(await tagService.addTag(data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/post-tags/{id}:
 *  put:
 *    tags:
 *      - tags
 *    summary: Update tag by id
 *    description: Use to update tag by id
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
 *    - name: tag's text
 *      in: body
 *      required: true
 *      schema:
 *         type: object
 *         properties:
 *             Text:
 *               type: string
 *               required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '404':
 *        description: Bad request
 */
router.put('/:id', CheckAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  const data = req.body;

  try {
    res.json(await tagService.updateTag(id, data));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/post-tags/{id}:
 *  delete:
 *    tags:
 *      - tags
 *    summary: Delete tag by id
 *    description: Use to delete tag by id
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
    res.json(await tagService.deleteTag(id));
  } catch (error) {
    next(error);
  }
});

export default router;
