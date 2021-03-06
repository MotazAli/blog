
import { Article } from "src/articles/schemas/article.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { User } from "src/users/schemas/user.schema";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { UpdateCommentDto } from "../dto/update.comment.dto";
import { Comment } from "../schemas/comment.schema";

export abstract class ICommentRepository{
    abstract insertComment(createCommentDto : CreateCommentDto, article:Article, user:User ): Promise<Comment> ;
    abstract updateComment(id :string ,updateCommentDto : UpdateCommentDto):  Promise<Comment> ;
    abstract deleteComment(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<Comment>;
    abstract findAll(): Promise<Comment[]>;
    abstract findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Comment[]>;
}