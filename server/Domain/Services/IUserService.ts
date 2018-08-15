import UserEntity from '../../Data/Entities/UserEntity';
import PostEntity from '../../Data/Entities/PostEntity';

export interface IUserService {
  getUsers(): Promise<UserEntity[]>;
  getUserPosts(id: number): Promise<PostEntity[]>;
  getUser(id: number): Promise<UserEntity>;
  updateUser(id: number, data: any): Promise<UserEntity>;
}
