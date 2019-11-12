import { injectable, inject } from 'inversify';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { ISettingsProvider } from '../../../API/infrastructure/index';
import { IAuthService } from '../index';
import { ISessionRepository, IUserRepository } from '../../../Data/Repositories';
import SessionEntity from '../../../Data/Entities/SessionEntity';
import { ICryptoService } from '../ICryptoService';
import UserEntity from '../../../Data/Entities/UserEntity';
import IUserDecodedFromToken from '../../../API/helper/IUserDecodedFromToken';

@injectable()
export class AuthService implements IAuthService {
  private readonly _userRepository: IUserRepository;
  private readonly _secretKey: string;
  private readonly _cryptoService: ICryptoService;
  private readonly _sessionRepository: ISessionRepository;

  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('CryptoService') cryptoService: ICryptoService,
    @inject('SessionRepository') sessionRepository: ISessionRepository,
    @inject('SettingsProvider') settingsProvider: ISettingsProvider
  ) {
    this._userRepository = userRepository;
    this._cryptoService = cryptoService;
    this._secretKey = settingsProvider.getSecretKey();
    this._sessionRepository = sessionRepository;
  }

  public async authWithLoginAndPassword({ Login, Password }: { Login: string; Password: string }) {
    const user = await this._userRepository.findOne({
      where: { Login },
    });
    if (user && this._cryptoService.passwordsVerification(Password, user.PasswordHash)) {
      const session = await this.createSession(user.get({ plain: true }));
      return {
        AccessToken: session.AccessToken,
        RefreshToken: session.RefreshToken,
        Data: {
          id: user.id,
          FirstName: user.FirstName,
          LastName: user.LastName,
          PhotoUrl: user.PhotoUrl,
          Login: user.Login,
          BornDate: user.BornDate,
        },
      };
    } else {
      throw { status: 401, message: 'Invalid username or password' };
    }
  }

  public async refreshSession(RefreshToken: string) {
    const session = await this._sessionRepository.findOne({
      where: { RefreshToken },
      include: UserEntity,
    });
    if (session && moment() < moment(session.ExpiresIn)) {
      const updatedSession = await this.updateSession(session);
      return {
        AccessToken: updatedSession.AccessToken,
        RefreshToken: updatedSession.RefreshToken,
        Data: {
          id: updatedSession.User.id,
          FirstName: updatedSession.User.FirstName,
          LastName: updatedSession.User.LastName,
          PhotoUrl: updatedSession.User.PhotoUrl,
          Login: updatedSession.User.Login,
          BornDate: updatedSession.User.BornDate,
        },
      };
    } else {
      throw { status: 401, message: 'Unauthorized' };
    }
  }

  public async verifyCredentials({ accessToken, refreshToken }) {
    if (accessToken && refreshToken) {
      try {
        const payload = jwt.verify(accessToken, this._secretKey) as IUserDecodedFromToken;
        const user = await this._userRepository.findById(payload.id);
        return {
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          Data: {
            id: user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            PhotoUrl: user.PhotoUrl,
            Login: user.Login,
            BornDate: user.BornDate,
          },
        };
      } catch (err) {
        if (err.message === 'jwt expired') {
          return this.refreshSession(refreshToken);
        }
        throw { status: 401, message: 'Unauthorized' };
      }
    } else {
      throw { status: 401, message: 'Unauthorized' };
    }
  }

  public async changePassword({ accessToken, password, newPassword }) {
    try {
      const payload = jwt.verify(accessToken, this._secretKey) as IUserDecodedFromToken;
      const user = await this._userRepository.findById(payload.id);
      if (user && this._cryptoService.passwordsVerification(password, user.PasswordHash)) {
        user.PasswordHash = this._cryptoService.passwordHashing(newPassword);
        return this._userRepository.update(user);
      } else {
        throw new Error('Unauthorized');
      }
    } catch (err) {
      throw { status: 401, message: err.message };
    }
  }

  private async updateSession(session: SessionEntity) {
    const { AccessToken, RefreshToken } = this.getTokens(session.User.get({ plain: true }));
    session.LastRefresh = moment().toDate();
    session.ExpiresIn = moment()
      .add(20, 'day')
      .toDate();
    session.AccessToken = AccessToken;
    session.RefreshToken = RefreshToken;
    return this._sessionRepository.update(session);
  }

  private async createSession(user: UserEntity) {
    const { AccessToken, RefreshToken } = this.getTokens(user);
    const session = new SessionEntity({
      UserId: user.id,
      AccessToken,
      RefreshToken,
      LastRefresh: moment(),
      ExpiresIn: moment().add(20, 'day'),
    });
    await this._sessionRepository.create(session);
    return session;
  }

  private getTokens(payload: any) {
    const AccessToken = jwt.sign(payload, this._secretKey, {
      expiresIn: '1h',
    });
    const RefreshToken = this._cryptoService.sha256Hashing(AccessToken);
    return { AccessToken, RefreshToken };
  }

  public async logout(refreshToken: string) {
    const session = await this._sessionRepository.findOne({
      where: { refreshToken },
    });

    if (session) {
      await this._sessionRepository.remove({ where: { refreshToken } });
    } else {
      throw { status: 401 };
    }
  }
}
