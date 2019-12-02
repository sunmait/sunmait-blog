import { Router } from 'express';
import auth from './AuthRouter';
import comments from './CommentRouter';
import posts from './PostRouter';
import postTags from './PostTagsRouter';
import users from './UserRouter';
import chat from './ChatRouter';

const router = Router();

router.use('/auth', auth);
router.use('/comments', comments);
router.use('/posts', posts);
router.use('/post-tags', postTags);
router.use('/users', users);
router.use('/chat', chat);

export default router;
