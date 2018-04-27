import UserEntity from '../../Data/Entities/UserEntity';

export interface IUserService {
  getUsers(): Promise<UserEntity[]>;
  getUser(id: number): Promise<UserEntity>;
  updateUser(id: number, data: any): Promise<UserEntity>;
}
