import { injectable } from 'inversify';
import { IMessagesRepository } from './../IMessagesRepository';
import MessagesEntity from '../../Entities/MessagesEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class MessagesRepository extends RepositoryBase<MessagesEntity> implements IMessagesRepository {
  constructor(messagesEntity: MessagesEntity) {
    super(messagesEntity);
  }
}
