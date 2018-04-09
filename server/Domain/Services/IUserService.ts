import UserEntity from '../../Data/Entities/UserEntity';

export interface IUserService {
  getUser(id: number): Promise<UserEntity>;
  updateUser(id: number, data: any): Promise<UserEntity>;
}
