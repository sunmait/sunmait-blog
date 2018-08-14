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
  queryParam,
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
    @queryParam('count') count: string,
    @queryParam('offset') offset: string,
    @response() res: express.Response
  ): Promise<void> {
    res.json(await this._postService.getPosts(count, offset));
  }

  /**
   * Add posts
   */
  @httpPost('/')
  // @ts-ignore
  private async add(@requestBody() body: any, @response() res: express.Response): Promise<void> {
    res.json(await this._postService.addPost(body));
  }

  /**
   * Update posts
   * id: post's id
   */
  @httpPatch('/')
  // @ts-ignore
  private async updatePost(@requestBody() data: any, @response() res: express.Response): Promise<void> {
    res.json(await this._postService.updatePost(data));
  }

  /**
   * Delete post
   * id: post's id
   */
  @httpDelete('/:id')
  private async delete(@requestParam('id') id: number, @response() res: express.Response): Promise<void> {
    res.json(await this._postService.deletePost(id));
  }
}
