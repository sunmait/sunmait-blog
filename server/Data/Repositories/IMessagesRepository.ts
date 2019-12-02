import { IRepository } from './IRepository';
import MessagesEntity from '../Entities/MessagesEntity';

export interface IMessagesRepository extends IRepository<MessagesEntity> {
  // specific methods
}
