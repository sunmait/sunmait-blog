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
  private async get(
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postService.getPost());
  }

  /**
   * Add posts
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postService.addPost(body));
  }

  /**
   * Update posts
   * id: post's id
   */
  @httpPatch('/:id')
  private async updatePost(
    @requestParam('id') id: number,
    @requestBody('description') description: string,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postService.updatePost(id, description));
  }

  /**
   * Delete post
   * id: post's id
   */
  @httpDelete('/:id')
  private async delete(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postService.deletePost(id));
  }

}
