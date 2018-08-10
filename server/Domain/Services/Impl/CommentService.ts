import { injectable, inject } from 'inversify';
import { ICommentService } from '../ICommentService';
import CommentEntity from '../../../Data/Entities/CommentEntity';
import { ICommentRepository } from '../../../Data/Repositories/index';

@injectable()
export class CommentService implements ICommentService {
  private readonly _commentRepository: ICommentRepository;
  constructor(@inject('CommentRepository') commentRepository: ICommentRepository) {
    this._commentRepository = commentRepository;
  }

  public async getCommentById(id: number): Promise<CommentEntity> {
    return this._commentRepository.find({
      where: { PostId: id },
    });
  }

  public async addComment(data: any): Promise<CommentEntity> {
    const comment = new CommentEntity(data);

    return this._commentRepository.create(comment);
  }

  public async updateComment(id: number, descriprion: string): Promise<CommentEntity> {
    const comment = await this._commentRepository.findById(id);
    comment.Text = descriprion;

    return this._commentRepository.update(comment);
  }

  public async deleteComment(id: number): Promise<void> {
    await this._commentRepository.remove({ where: { id } });
  }
}
