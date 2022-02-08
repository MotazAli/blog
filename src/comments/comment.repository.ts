import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICommentRepository } from "./abstracts/comment-repository-abstract";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";

@Injectable()
export class CommentRepository extends ICommentRepository{

    constructor(@InjectModel(Comment.name) private articleModel: Model<CommentDocument>){super();}


    async insertComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const newComment = new this.articleModel(createCommentDto);
        return newComment.save();
    }

    async updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const updatedComment = await this.articleModel.findByIdAndUpdate({_id:id},updateCommentDto);
        if(!updatedComment){
            throw new NotFoundException(`Comment with id ${id} not found`); 
        }
        return updatedComment;
    }

    async deleteComment(id: string): Promise<Boolean> {
        const deletedComment = await this.articleModel.findByIdAndDelete(id);
        return deletedComment? true: false;
    }
    async findOne(id: string): Promise<Comment> {
        const comment = await this.articleModel.findById({ _id: id }).exec();
        if(!comment){
            throw new NotFoundException(`Comment with id ${id} not found`); 
        }
        return comment;
    }
    async findAll(): Promise<Comment[]> {
        return await this.articleModel.find();
    }
    
}