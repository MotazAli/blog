import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Article } from "src/articles/schemas/article.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { User } from "src/users/schemas/user.schema";
import { ICommentRepository } from "./abstracts/comment-repository.abstract";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";

@Injectable()
export class CommentRepository extends ICommentRepository{

    constructor(@InjectModel(Comment.name) private articleModel: Model<CommentDocument>){super();}


    async insertComment(createCommentDto: CreateCommentDto,article:Article, user:User): Promise<Comment> {
        const newComment = new this.articleModel({...createCommentDto, article, user });
        return newComment.save();
    }

    async updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const updatedComment = await this.articleModel.findByIdAndUpdate(new Types.ObjectId( id),updateCommentDto,{new:true});
        if(!updatedComment){
            throw new NotFoundException(`Comment with id ${id} not found`); 
        }
        return updatedComment;
    }

    async deleteComment(id: string): Promise<Boolean> {
        const deletedComment = await this.articleModel.findByIdAndDelete(new Types.ObjectId( id));
        return deletedComment? true: false;
    }
    async findOne(id: string): Promise<Comment> {
        const comment = await this.articleModel.findById(new Types.ObjectId( id)).exec();
        if(!comment){
            throw new NotFoundException(`Comment with id ${id} not found`); 
        }
        return comment;
    }
    async findAll(): Promise<Comment[]> {
        return await this.articleModel.find();
    }

    async findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Comment[]>{
        const { limit, offset } = paginationQueryDto;
        return await this.articleModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();;
    }
    
}