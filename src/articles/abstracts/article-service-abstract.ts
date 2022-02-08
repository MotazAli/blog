import { CreateArticleDto } from "../dto/create-article.dto";
import { UpdateArticleDto } from "../dto/update-article.dto";
import { Article } from "../schemas/article.schema";

export abstract class IArticleService{
    abstract addArticle(userId :string,createArticleDto : CreateArticleDto): Promise<Article> ;
    abstract updateArticle(id :string ,updateArticleDto : UpdateArticleDto):  Promise<Article> ;
    abstract deleteArticle(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<Article>;
    abstract findAll(): Promise<Article[]>;
}