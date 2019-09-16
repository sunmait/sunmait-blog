import * as express from 'express';
import { container } from '../infrastructure/di/Container';
import { ITagService } from '../../Domain/Services';

import { CheckAuth } from '../middlewares/CheckAuth';

const router = express.Router();
const tagService = container.get<ITagService>('TagService');

/**
 * Operations about PostsTags.
 *
 * Get all tags
 */
router.get('/', async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.json(await tagService.getTags());
  } catch (error) {
    next(error);
  }
});

/**
 * Get tag by id
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
 * Add tags
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
 * Update tags
 * id: tags`s id
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
 * Delete tags
 * id: tags`s id
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
