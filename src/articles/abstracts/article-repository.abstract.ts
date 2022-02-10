import { Comment } from "src/comments/schemas/comment.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { User } from "src/users/schemas/user.schema";
import { CreateArticleDto } from "../dto/create-article.dto";
import { UpdateArticleDto } from "../dto/update-article.dto";
import { Article } from "../schemas/article.schema";

export abstract class IArticleRepository{
    abstract insertArticle(createArticleDto : CreateArticleDto, autherUser: User): Promise<Article> ;
    abstract updateArticle(id :string ,updateArticleDto : UpdateArticleDto): Promise<Article>;
    abstract updateArticleComments(id :string , comments: Comment[]): Promise<Article>;
    abstract updateArticleTotleThumbs(id :string , totleThumbs: number): Promise<Article>;
    abstract deleteArticle(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<Article>;
    abstract findAll(): Promise<Article[]>;
    abstract findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Article[]>;
}