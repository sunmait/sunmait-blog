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

router.get('/:postId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.params.postId;
  try {
    res.json(await commentService.getCommentsById(data));
  } catch (error) {
    next(error);
  }
});

/**
 * Update comment
 * id: comment's id
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
router.delete('/:id', CheckAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id;

  try {
    res.json(await commentService.deleteComment(id));
  } catch (error) {
    next(error);
  }
});

export default router;
