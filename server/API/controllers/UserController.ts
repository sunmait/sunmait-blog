import * as express from 'express';
import {
  controller,
  interfaces,
  response,
  requestParam,
  httpGet,
  httpPost,
  httpPatch,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUserService } from '../../Domain/Services';
import { CheckAuth } from '../middlewares/CheckAuth';

/**
 * Operations about users.
 */
@controller('/api/users')
export class UserController implements interfaces.Controller {
  private readonly _userService: IUserService;

  constructor(
    @inject('UserService') userService: IUserService,
  ) {
    this._userService = userService;
  }

  /**
   * Get information about user
   */
  @httpGet('/:id')
  private async get(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._userService.getUser(id));
  }

  /**
   * Updating user
   */
  @httpPatch('/:id')
  private async updateUser(
    @requestParam('id') id: number,
    @requestBody() data: any,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._userService.updateUser(id, data));
  }
}
