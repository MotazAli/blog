import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IArticleRepository } from "./abstracts/article-repository-abstract";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article, ArticleDocument } from "./schemas/article.schema";

@Injectable()
export class ArticleRepository extends IArticleRepository{

    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument> ){ super();}


    async insertArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const newArticle = new this.articleModel(createArticleDto);
        return newArticle.save();
    }
    async updateArticle(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const updatedArticle = await this.articleModel.findByIdAndUpdate({_id:id},updateArticleDto)
        if (!updatedArticle) {
            throw new NotFoundException(`Article #${id} not found`);
          }
      
          return updatedArticle;
    }
    async deleteArticle(id: string): Promise<Boolean> {
        const oldArticle = await this.articleModel.findByIdAndDelete(id)
        return oldArticle? true: false;
    }
    async findOne(id: string): Promise<Article> {
        const article = await this.articleModel
        .findById({ _id: id })
        .exec();

        if (!article) {
        throw new NotFoundException(`Article #${id} not found`);
        }

        return article;
    }
    async findAll(): Promise<Article[]> { return  await this.articleModel.find();}
    
}