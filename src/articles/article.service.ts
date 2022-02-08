import { Injectable } from "@nestjs/common";
import { IArticleService } from "./abstracts/article-service-abstract"
import { ArticleRepository } from "./article.repository";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./schemas/article.schema";

@Injectable()
export class ArticleService extends IArticleService {


    constructor(private articleRepository: ArticleRepository){ super(); }

    async addArticle(userId :string,createArticleDto: CreateArticleDto): Promise<Article> {
        createArticleDto.autherUserId = userId;
        return await this.articleRepository.insertArticle(createArticleDto);
    }
    async updateArticle(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        return await this.articleRepository.updateArticle(id,updateArticleDto);
    }
    async deleteArticle(id: string): Promise<Boolean> {
        return await this.articleRepository.deleteArticle(id);
    }
    async findOne(id: string): Promise<Article> {
        return await this.articleRepository.findOne(id);
    }
    async findAll(): Promise<Article[]> {
        return await this.articleRepository.findAll();
    }

}