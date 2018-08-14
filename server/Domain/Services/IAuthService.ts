export interface IAuthService {
  authWithLoginAndPassword({ Login, Password }: { Login: string; Password: string }): Promise<object>;
  refreshSession(RefreshToken: string): Promise<object>;
  verifyCredentials({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }): Promise<any>;
  logout(RefreshToken: string): Promise<void>;
}
