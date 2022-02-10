import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./schemas/article.schema";

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
    
    constructor(private articleService:ArticleService){}

    @ApiQuery({ required:false,name:'offset', schema:{ type: 'number' , example:0} })
    @ApiQuery({ required:false,name:'limit', schema:{ type: 'number' , example:5} })
    @ApiOkResponse({type : Article , isArray : true , description: "Response with (Articles) as collection of object"})
    @Get()
    async getArticles(@Query() paginationQueryDto:PaginationQueryDto): Promise<Article[]> {
        if(Object.keys(paginationQueryDto).length==0 ){
            return await this.articleService.findAll();
        }
        return await this.articleService.findAllUsing(paginationQueryDto);
    } 

    @ApiOkResponse({type : Article, description: "Response with (Article) as object"})
    @Get(':id')
    async getArticleById(@Param('id') id : string): Promise<Article> {
        return await this.articleService.findOne(id);
    } 

    @ApiOkResponse({type : Article , description: "Response with (Article) as object" })
    @Post('')
    async addArticle(@Body() createArticleDto : CreateArticleDto): Promise<Article> {
        return await this.articleService.addArticle(createArticleDto);
    } 

    @ApiOkResponse({type : Article , description: "Response with (Article) as object" })
    @ApiNotFoundResponse({description : "Response with error if the Article not found"})
    @Put(':id')
    async updateArticle(@Param('id') id : string ,@Body() updateArticleDto : UpdateArticleDto): Promise<Article> {
        return await this.articleService.updateArticle(id,updateArticleDto);
    } 

    @ApiOkResponse({type : Boolean , description: "Response with (true) if the Article deleted succefuly" })
    @ApiNotFoundResponse({description : "Response with error if the Article not found"})
    @Delete(':id')
    async deleteArticle(@Param('id') id : string): Promise<Boolean> {
        return await this.articleService.deleteArticle(id);
    } 

}