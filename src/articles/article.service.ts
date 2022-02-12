import { Injectable, NotFoundException } from "@nestjs/common";
import { Comment } from "../comments/schemas/comment.schema";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { UserService } from "../users/user.service";
import { IArticleService } from "./abstracts/article-service.abstract"
import { ArticleRepository } from "./article.repository";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./schemas/article.schema";

@Injectable()
export class ArticleService extends IArticleService {
    
    constructor(
        private articleRepository: ArticleRepository,
        private userService: UserService
        ){ super(); }

    async addArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        
        const autherUser = await this.userService.findOne(createArticleDto.autherUserId);
        if(!autherUser){ 
            throw new NotFoundException(`Auther user with id ${createArticleDto.autherUserId} not found`);
        }

        createArticleDto.totleThumbs = 0;
        const insertedArticle = await this.articleRepository.insertArticle(createArticleDto,autherUser);
        const newAttchedArticles = [insertedArticle, ...autherUser.articles];
        // update user articles
        await this.userService.updateUserArticles(createArticleDto.autherUserId,newAttchedArticles);
        return insertedArticle;

    }
    async updateArticle(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        return await this.articleRepository.updateArticle(id,updateArticleDto);
    }

    async updateArticleComments(id: string, comments: Comment[]): Promise<Article> {
        return await this.articleRepository.updateArticleComments(id,comments);
    }

    async updateArticleTotleThumbs(id: string, totleThumbs: number): Promise<Article> {
        return await this.articleRepository.updateArticleTotleThumbs(id,totleThumbs);
    }

    async deleteArticle(id: string): Promise<Boolean> {

        const deletedArticle = await this.articleRepository.findOne(id);
        if(!deletedArticle){ 
            throw new NotFoundException(`Article with id ${id} not found`);
        }

        const autherUser = await this.userService.findOne(deletedArticle.autherUser.id);
        if(!autherUser){ 
            throw new NotFoundException(`Auther user with id ${deletedArticle.autherUser.id} not found`);
        }

        // deleted article referance
        const newAttchedArticles = autherUser.articles.filter((article)=> article.id != id);
        // update user articles
        await this.userService.updateUserArticles(deletedArticle.autherUser.id,newAttchedArticles);
        
        return await this.articleRepository.deleteArticle(id);
    }
    async findOne(id: string): Promise<Article> {
        return await this.articleRepository.findOne(id);
    }
    async findAll(): Promise<Article[]> {
        return await this.articleRepository.findAll();
    }

    async findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Article[]> {
        return await this.articleRepository.findAllUsing(paginationQueryDto);
    }

}