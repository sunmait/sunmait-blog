import * as moment from 'moment';
import { asyncForEach } from './../../helpers/TagsHelper';
import { injectable, inject } from 'inversify';
import { IChatService } from '../IChatService';
import { IMessagesInfoRepository, IMessagesRepository } from '../../../Data/Repositories/index';
import { IGetChatsOptions, IGetMessagesOptions } from '../IChatService';
import MessagesEntity from '../../../Data/Entities/MessagesEntity';
import MessagesInfoEntity from '../../../Data/Entities/MessagesInfoEntity';

@injectable()
export class ChatService implements IChatService {
  private readonly _messagesInfoRepository: IMessagesInfoRepository;
  private readonly _messagesRepository: IMessagesRepository;
  constructor(
    @inject('MessagesInfoRepository') messagesInfoRepository: IMessagesInfoRepository,
    @inject('MessagesRepository') messagesRepository: IMessagesRepository
  ) {
    this._messagesInfoRepository = messagesInfoRepository;
    this._messagesRepository = messagesRepository;
  }

  public async getUserChats(params: IGetChatsOptions): Promise<any> {
    const options: any = {
      where: {
        $or: [{ UserTo: params.userId }, { UserFrom: params.userId }],
      },
      order: [['Date', 'DESC']],
    };
    const chats = await this._messagesInfoRepository.findAll(options);
    const chatsWithUsers = [+params.userId];
    const chatsAndMessages = [];
    await asyncForEach(chats, async chat => {
      if (!chatsWithUsers.includes(chat.UserFrom) || !chatsWithUsers.includes(chat.UserTo)) {
        const chatMessages = await this.getMessages({ user1: chat.UserTo, user2: chat.UserFrom, count: 20, offset: 0 });
        chatsAndMessages.push({
          userWith: chat.UserTo === +params.userId ? chat.UserFrom : chat.UserTo,
          chat: chatMessages,
        });
        !chatsWithUsers.includes(chat.UserFrom) ? chatsWithUsers.push(chat.UserFrom) : chatsWithUsers.push(chat.UserTo);
      }
    });
    return chatsAndMessages.splice(+params.offset, +params.count);
  }

  public async getMessages(params: IGetMessagesOptions): Promise<any> {
    const options: any = {
      where: {
        $or: [{ UserTo: params.user1, UserFrom: params.user2 }, { UserTo: params.user2, UserFrom: params.user1 }],
      },
      order: [['Date', 'DESC']],
    };
    const chat = [];
    const chatEntity = await this._messagesInfoRepository.findAll(options);
    await asyncForEach(chatEntity, async messageInfo => {
      const messageText = (await this._messagesRepository.find({ where: { InfoId: messageInfo.id } })).Message;
      chat.push({
        id: messageInfo.id,
        from: messageInfo.UserFrom,
        to: messageInfo.UserTo,
        fromStatus: messageInfo.fromStatus,
        toStatus: messageInfo.toStatus,
        date: moment(messageInfo.Date).format('DD.MM.YY in h:mm'),
        message: messageText,
      });
    });
    return chat.splice(+params.offset, +params.count);
  }

  public async newMessage({ UserFrom, UserTo, Message }): Promise<MessagesEntity> {
    const messageInfo = new MessagesInfoEntity({ UserFrom, UserTo, fromStatus: 'sent', toStatus: 'get' });
    const InfoId = (await this._messagesInfoRepository.create(messageInfo)).id;
    const message = new MessagesEntity({ InfoId, Message });
    return this._messagesRepository.create(message);
  }

  public async updateStatusMessage({ id, fromStatus, toStatus, Message }): Promise<MessagesInfoEntity> {
    const messageInfo = await this._messagesInfoRepository.findById(id);
    if (!!fromStatus) {
      messageInfo.fromStatus = fromStatus;
    }
    if (!!toStatus) {
      messageInfo.toStatus = toStatus;
    }
    if (!!Message && messageInfo.fromStatus !== 'deleted') {
      const message = await this._messagesRepository.find({
        where: { InfoId: messageInfo.id },
      });
      message.Message = Message;
      if (messageInfo.fromStatus === 'sent') {
        messageInfo.fromStatus = 'updated';
      }
      await this._messagesRepository.update(message);
    }

    return this._messagesInfoRepository.update(messageInfo);
  }
}
