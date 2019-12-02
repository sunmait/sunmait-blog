import { injectable } from 'inversify';
import { IMessagesInfoRepository } from './../IMessagesInfoRepository';
import MessagesInfoEntity from '../../Entities/MessagesInfoEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class MessagesInfoRepository extends RepositoryBase<MessagesInfoEntity> implements IMessagesInfoRepository {
  constructor(messagesInfoEntity: MessagesInfoEntity) {
    super(messagesInfoEntity);
  }
}
