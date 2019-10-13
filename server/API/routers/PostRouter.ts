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
 * Operations about Posts.
 *
 * Get posts
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
    res.json(await commentService.getCommentsById(id));
  } catch (error) {
    next(error);
  }
});
/**
 * Create Like for post
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
router.post(
  '/:id/rating',
  CheckAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Its meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', req.body);
    const { Value, UserId, PostId } = req.body;
    try {
      res.json(await postService.setRating(PostId, UserId, Value));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get tag of post by id
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
