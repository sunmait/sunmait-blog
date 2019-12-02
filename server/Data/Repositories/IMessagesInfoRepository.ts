import { IRepository } from './IRepository';
import MessagesInfoEntity from '../Entities/MessagesInfoEntity';

export interface IMessagesInfoRepository extends IRepository<MessagesInfoEntity> {
  // specific methods
}
