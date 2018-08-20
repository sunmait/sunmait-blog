import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IPostService, ICommentService } from '../../Domain/Services';
import IRequest from '../helper/IRequest';
import { CheckAuth } from '../middlewares/CheckAuth';

const router = express.Router();
const postService = container.get<IPostService>('PostService');
const commentService = container.get<ICommentService>('CommentService');

/**
 * Operations about Posts.
 *
 * Get posts
 */
router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { count, offset } = req.query;

  try {
    res.json(await postService.getPosts(count, offset));
  } catch (error) {
    next(error);
  }
});

/**
 * Get post by id
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
 * Get comments of post by id
 */
router.get('/:id/comments', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  try {
    res.json(await commentService.getCommentById(id));
  } catch (error) {
    next(error);
  }
});

/**
 * Add posts
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
 * Update posts
 * id: post's id
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
 * Like/dislike post
 * postId: post's id
 */
router.post('/:postId/like', CheckAuth, async (req: IRequest, res: express.Response, next: express.NextFunction) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    res.json(await postService.likeOrDislike(postId, userId));
  } catch (error) {
    next(error);
  }
});

/**
 * Delete post
 * id: post's id
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
