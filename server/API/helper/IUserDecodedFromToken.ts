export default interface IUserDecodedFromToken {
  id: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  PhotoUrl: string;
  LastName: string;
  FirstName: string;
  Login: string;
  PasswordHash: string;
  iat: number;
  exp: number;
}
