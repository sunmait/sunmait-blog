import * as express from 'express';
import {
  controller,
  httpGet,
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

import { IPostService } from './../../Domain/Services/index';

/**
 * Operations about Posts.
 */
@controller('/api/posts')
export class PostController implements interfaces.Controller {
  private readonly _postService: IPostService;

  constructor(@inject('PostService') PostService: IPostService) {
    this._postService = PostService;
  }

  /**
   * Get posts
   */
  @httpGet('/')
  // @ts-ignore
  private async get(@response() res: express.Response, @nextFn() next: express.NextFunction): Promise<void> {
    try {
      res.json(await this._postService.getPosts());
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add posts
   */
  @httpPost('/')
  // @ts-ignore
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._postService.addPost(body));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update posts
   * id: post's id
   */
  @httpPatch('/')
  // @ts-ignore
  private async updatePost(
    @requestBody() data: any,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._postService.updatePost(data));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete post
   * id: post's id
   */
  @httpDelete('/:id')
  // @ts-ignore
  private async delete(
    @requestParam() data: any,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._postService.deletePost(data.id));
    } catch (error) {
      next(error);
    }
  }
}
