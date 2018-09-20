import { injectable, inject } from 'inversify';
import { IUserService } from '../IUserService';
import UserEntity from '../../../Data/Entities/UserEntity';
import PostEntity from '../../../Data/Entities/PostEntity';
import { IUserRepository, IPostRepository } from '../../../Data/Repositories/index';

@injectable()
export class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  private readonly _postRepository: IPostRepository;
  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('PostRepository') postRepository: IPostRepository
  ) {
    this._userRepository = userRepository;
    this._postRepository = postRepository;
  }

  public async getUsers(): Promise<UserEntity[]> {
    const users = await this._userRepository.findAll({});
    const information = users.map(user => {
      const userEntity = {
        id: user.id,
        FirstName: user.FirstName,
      };
      return userEntity;
    });
    return information as UserEntity[];
  }

  public async getUser(id: number): Promise<UserEntity> {
    const user = await this._userRepository.find({ where: { id } });
    if (user) {
      const information = {
        FirstName: user.FirstName,
        LastName: user.LastName,
        PhotoUrl: user.PhotoUrl,
        Login: user.Login,
        id: user.id,
      };
      return information as UserEntity;
    } else {
      throw { status: 404, message: 'Not found' };
    }
  }

  public async getUserPosts(id: number): Promise<PostEntity[]> {
    return this._postRepository.findAll({ where: { userId: id } });
  }

  public async updateUser(id: number, data: any): Promise<UserEntity> {
    const user = await this._userRepository.findById(id);
    user.FirstName = data.FirstName;
    user.LastName = data.LastName;

    return this._userRepository.update(user);
  }
}
