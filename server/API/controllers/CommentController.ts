import * as express from 'express';
import {
  controller,
  httpPost,
  interfaces,
  requestParam,
  response,
  requestBody,
  httpDelete,
  httpPatch,
  next as nextFn,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { ICommentService } from './../../Domain/Services/index';

/**
 * Operations about Comments.
 */
@controller('/api/comments')
export class CommentController implements interfaces.Controller {
  private readonly _commentService: ICommentService;

  constructor(@inject('CommentService') CommentService: ICommentService) {
    this._commentService = CommentService;
  }

  /**
   * Get comments
   */
  @httpPost('/')
  // @ts-ignore
  private async get(
    @requestBody('id') id: number,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._commentService.getCommentById(id));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add comment
   */
  @httpPost('/')
  // @ts-ignore
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._commentService.addComment(body));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update comment
   * id: comment's id
   */
  @httpPatch('/:id')
  // @ts-ignore
  private async updateComment(
    @requestParam('id') id: number,
    @requestBody('description') description: string,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._commentService.updateComment(id, description));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete comment
   * id: comment's id
   */
  @httpDelete('/:id')
  // @ts-ignore
  private async delete(
    @requestParam('id') id: number,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._commentService.deleteComment(id));
    } catch (error) {
      next(error);
    }
  }
}
