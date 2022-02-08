import { Injectable, NotFoundException } from "@nestjs/common";
import { ICommentService } from "./abstracts/comment-service-abstract";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";

@Injectable()
export class CommentService extends ICommentService{

    constructor(private commentRepository: CommentRepository){super();}


    async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentRepository.insertComment(createCommentDto);
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