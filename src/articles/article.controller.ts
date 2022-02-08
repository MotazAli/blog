import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./schemas/article.schema";

@Controller('articles')
export class ArticleController {
    
    constructor(private articleService:ArticleService){}

    @HttpCode(200)
    @Get()
    async getArticles(): Promise<Article[]> {
        return await this.articleService.findAll();
    } 

    @HttpCode(200)
    @Get(':id')
    async getArticleById(@Param('id') id : string): Promise<Article> {
        return await this.articleService.findOne(id);
    } 

    @HttpCode(200)
    @Post(':userId')
    async addArticle(@Param('userId') userId:string ,@Body() createArticleDto : CreateArticleDto): Promise<Article> {
        return await this.articleService.addArticle(userId,createArticleDto);
    } 

    @HttpCode(200)
    @Put(':id')
    async updateArticle(@Param('id') id : string ,@Body() updateArticleDto : UpdateArticleDto): Promise<Article> {
        return await this.articleService.updateArticle(id,updateArticleDto);
    } 

    @HttpCode(200)
    @Delete(':id')
    async delteUser(@Param('id') id : string): Promise<Boolean> {
        return await this.articleService.deleteArticle(id);
    } 

}