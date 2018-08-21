import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { IPostService } from '../../Domain/Services';

const router = express.Router();
const postService = container.get<IPostService>('PostService');

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
 * Add posts
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
router.patch('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = req.body;

  try {
    res.json(await postService.updatePost(data));
  } catch (error) {
    next(error);
  }
});

/**
 * Delete post
 * id: post's id
 */
router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  try {
    res.json(await postService.deletePost(id));
  } catch (error) {
    next(error);
  }
});

export default router;
