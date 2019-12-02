import MessagesInfoEntity from './../../Data/Entities/MessagesInfoEntity';
import MessagesEntity from '../../Data/Entities/MessagesEntity';

export interface IGetChatsOptions {
  userId: number;
  count?: number;
  offset?: number;
}

export interface IGetMessagesOptions {
  user1: number;
  user2: number;
  count?: number;
  offset?: number;
}

export interface IChatService {
  getUserChats(params: IGetChatsOptions): Promise<any>;
  getMessages(params: IGetMessagesOptions): Promise<any>;
  newMessage({
    UserFrom,
    UserTo,
    Message,
  }: {
    UserFrom: number;
    UserTo: number;
    Message: string;
  }): Promise<MessagesEntity>;

  updateStatusMessage({
    id,
    fromStatus,
    toStatus,
    Message,
  }: {
    id: number;
    fromStatus?: string;
    toStatus?: string;
    Message?: string;
  }): Promise<MessagesInfoEntity>;

  // addPost(data: any): Promise<PostEntity>;
  // updatePost(data: any): Promise<PostEntity>;
  // deletePost(id: number): Promise<PostEntity[]>;
  // likeOrDislike(postId: number, userId: number, userinfo: object): Promise<any>;
  // setRating(postId: number, userId: number, value: number): Promise<any>;
  // setAveragePostRating(postId: number): Promise<any>;
  // setUserPostRating(payload: any): Promise<any>;
}
