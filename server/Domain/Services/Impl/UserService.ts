import { injectable, inject } from 'inversify';
import { IUserService } from '../IUserService';
import UserEntity from '../../../Data/Entities/UserEntity';
import { IUserRepository } from '../../../Data/Repositories/index';

@injectable()
export class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
  ) {
    this._userRepository = userRepository;
  }

  public async getUser(id: number): Promise<UserEntity> {
    const user = await this._userRepository.find({where: { id }});
    const information = {
      FirstName: user.FirstName,
      LastName: user.LastName,
      PhotoUrl: user.PhotoUrl,
      Login: user.Login,
      id: user.id,
    };
    return information as UserEntity;
  }

  public async updateUser(id: number, data: any): Promise<UserEntity> {
    const user = await this._userRepository.findById(id);
    user.PhotoUrl = data.PhotoUrl;
    user.FirstName = data.FirstName;
    user.LastName = data.LastName;
    user.Login = data.Login;
    user.id = data.id;

    return this._userRepository.update(user);
  }

}
