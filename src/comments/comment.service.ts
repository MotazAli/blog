import { Injectable, NotFoundException } from "@nestjs/common";
import { ArticleService } from "../articles/article.service";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { UserService } from "../users/user.service";
import { ICommentService } from "./abstracts/comment-service.abstract";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { Comment } from "./schemas/comment.schema";

@Injectable()
export class CommentService extends ICommentService{

    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly articleService: ArticleService,
        private readonly userService: UserService
        ){super();}


    async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const article = await this.articleService.findOne(createCommentDto.articleId);
        if(!article){
            throw new NotFoundException(`Article with id ${createCommentDto.articleId} not found `)
        }
        const user = await this.userService.findOne(createCommentDto.userId);
        if(!user){
            throw new NotFoundException(`User with id ${createCommentDto.userId} not found `)
        }
        const insertedComment =  await this.commentRepository.insertComment(createCommentDto,article,user);
        const newAttchedComments = [insertedComment, ...article.comments];
        await this.articleService.updateArticleComments(createCommentDto.articleId,newAttchedComments);
        return insertedComment;
    }

    async updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return await this.commentRepository.updateComment(id,updateCommentDto);
    }

    async deleteComment(id: string): Promise<Boolean> {

        const deletedComment = await this.commentRepository.findOne(id);
        if(!deletedComment){
            throw new NotFoundException(`Comment with id ${id} not found `)
        }

        const article = await this.articleService.findOne( deletedComment.article.id);
        if(!article){
            throw new NotFoundException(`Article with id ${deletedComment.article.id} not found `)
        }
        console.log(article);
        console.log(article.comments);
        //remove comment referance
        const newAttchedComments = article.comments.filter(( comment )=> comment.id != id );
        await this.articleService.updateArticleComments(deletedComment.article.id,newAttchedComments);
        
        return await this.commentRepository.deleteComment(id);
    }
    async findOne(id: string): Promise<Comment> {
        return await this.commentRepository.findOne(id);
    }
    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.findAll();
    }

    async findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Comment[]> {
        return await this.commentRepository.findAllUsing(paginationQueryDto);
    }
    
}