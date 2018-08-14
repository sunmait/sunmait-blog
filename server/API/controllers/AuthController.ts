import * as express from 'express';
import {
  controller,
  httpPost,
  httpPatch,
  interfaces,
  response,
  requestParam,
  requestBody,
  httpDelete,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IAuthService } from '../../Domain/Services';

/**
 * Operations about authentification.
 */
@controller('/api/auth')
export class AuthController implements interfaces.Controller {
  private readonly _authService: IAuthService;

  constructor(@inject('AuthService') authService: IAuthService) {
    this._authService = authService;
  }

  @httpPost('/')
  // @ts-ignore
  private async auth(@response() res: express.Response, @requestBody() body: any): Promise<void> {
    res.json(await this._authService.authWithLoginAndPassword(body));
  }

  @httpPatch('/refresh/:refreshToken')
  // @ts-ignore
  private async refreshSession(
    @response() res: express.Response,
    @requestParam('refreshToken') refreshToken: string
  ): Promise<void> {
    res.json(await this._authService.refreshSession(refreshToken));
  }

  @httpPatch('/verify-credentials')
  // @ts-ignore
  private async verifyCredentials(@response() res: express.Response, @requestBody() body: any): Promise<void> {
    res.json(await this._authService.verifyCredentials(body));
  }

  @httpDelete('/:refreshToken')
  // @ts-ignore
  private async logout(
    @response() res: express.Response,
    @requestParam('refreshToken') refreshToken: string
  ): Promise<void> {
    res.json(await this._authService.logout(refreshToken));
  }
}
