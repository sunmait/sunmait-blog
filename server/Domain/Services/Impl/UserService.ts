import { injectable, inject } from 'inversify';
import { IUserService } from '../IUserService';
import UserEntity from '../../../Data/Entities/UserEntity';
import { IUserRepository } from '../../../Data/Repositories/index';

interface IUser {
  FirstName?: string;
  LastName?: string;
  BornDate?: Date;
  PhotoUrl?: string;
}
@injectable()
export class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  constructor(@inject('UserRepository') userRepository: IUserRepository) {
    this._userRepository = userRepository;
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
        BornDate: user.BornDate,
        Login: user.Login,
        id: user.id,
      };
      return information as UserEntity;
    } else {
      throw { status: 404, message: 'Not found' };
    }
  }

  public async updateUser(id: number, data: IUser): Promise<UserEntity> {
    if (!isNaN(id)) {
      const user: UserEntity = await this._userRepository.findById(id);
      if (typeof data.FirstName === 'string') {
        user.FirstName = data.FirstName;
      }
      if (data.LastName !== undefined) {
        user.LastName = data.LastName;
      }
      if (data.BornDate !== undefined) {
        user.BornDate = data.BornDate;
      }
      if (data.PhotoUrl !== undefined) {
        user.PhotoUrl = data.PhotoUrl;
      }
      return this._userRepository.update(user);
    } else {
      // ??????????????????????? TO DO
    }
  }
}
