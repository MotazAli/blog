import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model , Types } from "mongoose";
import { Comment } from "src/comments/schemas/comment.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { User } from "src/users/schemas/user.schema";
import { IArticleRepository } from "./abstracts/article-repository.abstract";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article, ArticleDocument } from "./schemas/article.schema";

@Injectable()
export class ArticleRepository extends IArticleRepository{
    
    

    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument> ){ super();}


    async insertArticle(createArticleDto: CreateArticleDto, autherUser: User): Promise<Article> {
        const newArticle = new this.articleModel({...createArticleDto,autherUser});
        return await newArticle.save();
    }
    async updateArticle(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const updatedArticle = await this.articleModel.findByIdAndUpdate( new Types.ObjectId( id),updateArticleDto)
        if (!updatedArticle) {
            throw new NotFoundException(`Article with id ${id} not found`);
          }
      
          return updatedArticle;
    }



    async updateArticleComments(id: string, comments: Comment[]): Promise<Article> {
        const updatedArticle = await this.articleModel.findByIdAndUpdate( new Types.ObjectId( id),{comments:comments})
        if (!updatedArticle) {
            throw new NotFoundException(`Article with id ${id} not found`);
          }
      
          return updatedArticle;
    }


    async updateArticleTotleThumbs(id: string, totleThumbs: number): Promise<Article> {
        const updatedArticle = await this.articleModel.findByIdAndUpdate( new Types.ObjectId( id),{totleThumbs:totleThumbs})
        if (!updatedArticle) {
            throw new NotFoundException(`Article with id ${id} not found`);
          }
      
          return updatedArticle;
    }


    async deleteArticle(id: string): Promise<Boolean> {
        const oldArticle = await this.articleModel.findByIdAndDelete(new Types.ObjectId( id))
        return oldArticle? true: false;
    }
    async findOne(id: string): Promise<Article> {
        const article = await this.articleModel
        .findById( new Types.ObjectId( id))
        .populate('autherUser')
        .populate('comments')
        .exec();

        if (!article) {
        throw new NotFoundException(`Article with id ${id} not found`);
        }

        return article;
    }
    async findAll(): Promise<Article[]> { 
        return  await this.articleModel
        .find()
        .sort({totleThumbs: 'descending'})
        .exec();
    }

    async findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Article[]>{
        const { limit, offset } = paginationQueryDto;
        return await this.articleModel
        .find()
        .sort({totleThumbs: 'descending'})
        .skip(offset)
        .limit(limit)
        .exec();;
    }
    
}