import * as express from 'express';
import {
  controller,
  httpPost,
  httpPatch,
  interfaces,
  response,
  requestParam,
  requestBody,
  next as nextFn,
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
  private async auth(
    @response() res: express.Response,
    @requestBody('Login') Login: string,
    @requestBody('Password') Password: string,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._authService.authWithLoginAndPassword(Login, Password));
    } catch (err) {
      next(err);
    }
  }

  @httpPatch('/refresh/:refreshToken')
  // @ts-ignore
  private async refreshSession(
    @response() res: express.Response,
    @requestParam('refreshToken') refreshToken: string,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._authService.refreshSession(refreshToken));
    } catch (err) {
      next(err);
    }
  }

  @httpPatch('/verify-credentials')
  // @ts-ignore
  private async verifyCredentials(
    @response() res: express.Response,
    @requestBody() body: any,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._authService.verifyCredentials(body));
    } catch (err) {
      next(err);
    }
  }

  @httpDelete('/:refreshToken')
  // @ts-ignore
  private async logout(
    @response() res: express.Response,
    @requestParam('refreshToken') refreshToken: string,
    @nextFn() next: express.NextFunction
  ): Promise<void> {
    try {
      res.json(await this._authService.logout(refreshToken));
    } catch (err) {
      next(err);
    }
  }
}
