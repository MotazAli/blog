import { Injectable, NotFoundException } from "@nestjs/common";
import { ArticleService } from "src/articles/article.service";
import { UserService } from "src/users/user.service";
import { ICommentService } from "./abstracts/comment-service.abstract";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";

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
        return await this.commentRepository.deleteComment(id);
    }
    async findOne(id: string): Promise<Comment> {
        return await this.commentRepository.findOne(id);
    }
    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.findAll();
    }
    
}