import { Router } from 'express';

import auth from './AuthRouter';
import comments from './CommentRouter';
import posts from './PostRouter';
import users from './UserRouter';

const router = Router();

router.use('/auth', auth);
router.use('/comments', comments);
router.use('/posts', posts);
router.use('/users', users);

export default router;
