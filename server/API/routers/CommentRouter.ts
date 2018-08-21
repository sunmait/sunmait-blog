import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { ICommentService } from '../../Domain/Services';

const router = express.Router();
const commentService = container.get<ICommentService>('CommentService');

/**
 * Operations about Comments.
 *
 * Get comments
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.body;

  try {
    res.json(await commentService.getCommentById(id));
  } catch (error) {
    next(error);
  }
});

/**
 * Add comment
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await commentService.addComment(data));
  } catch (error) {
    next(error);
  }
});

/**
 * Update comment
 * id: comment's id
 */
router.patch('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id;

  try {
    res.json(await commentService.deleteComment(id));
  } catch (error) {
    next(error);
  }
});

export default router;
