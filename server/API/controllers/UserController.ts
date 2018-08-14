import * as express from 'express';
import {
  controller,
  interfaces,
  response,
  requestParam,
  httpGet,
  httpPatch,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUserService } from '../../Domain/Services';

/**
 * Operations about users.
 */
@controller('/api/users')
export class UserController implements interfaces.Controller {
  private readonly _userService: IUserService;

  constructor(@inject('UserService') userService: IUserService) {
    this._userService = userService;
  }

  /**
   * Get users
   */
  @httpGet('/')
  // @ts-ignore
  private async get(@response() res: express.Response): Promise<void> {
    res.json(await this._userService.getUsers());
  }

  /**
   * Get information about user
   */
  @httpGet('/:id')
  // @ts-ignore
  private async getUser(@requestParam('id') id: number, @response() res: express.Response): Promise<void> {
    res.json(await this._userService.getUser(id));
  }

  /**
   * Updating user
   */
  @httpPatch('/:id')
  // @ts-ignore
  private async updateUser(
    @requestParam('id') id: number,
    @requestBody() data: any,
    @response() res: express.Response
  ): Promise<void> {
    res.json(await this._userService.updateUser(id, data));
  }
}
