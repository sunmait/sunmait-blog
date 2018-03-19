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

import { IPostsService } from './../../Domain/Services/index';

/**
 * Operations about Posts.
 */
@controller('/api/posts')
export class PostsController implements interfaces.Controller {
  private readonly _postsService: IPostsService;

  constructor(@inject('PostsService') PostsService: IPostsService) {
    this._postsService = PostsService;
  }

  /**
   * Get posts
   * idPost: post id
   */
  @httpGet('/:idPost')
  private async get(
    @requestParam('idPost') idPost: number,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postsService.getPostWithId(idPost));
  }

  /**
   * Add posts
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postsService.addPost(body));
  }

  /**
   * Update posts
   * idPost: post
   */
  @httpPatch('/:idPost')
  private async updatePost(
    @requestParam('idPost') idPost: number,
    @requestBody('description') description: string,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postsService.updatePost(idPost, description));
  }

  /**
   * Delete post
   * idPost: post
   */
  @httpDelete('/:id')
  private async delete(
    @requestParam('idPost') idPost: number,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._postsService.deletePost(idPost));
  }

}
