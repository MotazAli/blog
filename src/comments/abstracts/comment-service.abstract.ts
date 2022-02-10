
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { UpdateCommentDto } from "../dto/update.comment.dto";
import { Comment } from "../schemas/comment.schema";

export abstract class ICommentService{
    abstract addComment(createCommentDto : CreateCommentDto): Promise<Comment> ;
    abstract updateComment(id :string ,updateCommentDto : UpdateCommentDto):  Promise<Comment> ;
    abstract deleteComment(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<Comment>;
    abstract findAll(): Promise<Comment[]>;
    abstract findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Comment[]>;
}