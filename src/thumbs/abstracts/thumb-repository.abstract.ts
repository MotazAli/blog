
import { Article } from "src/articles/schemas/article.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { User } from "src/users/schemas/user.schema";
import { CreateThumbDto } from "../dto/create-thumb.dto";
import { UpdateThumbDto } from "../dto/update-thumb.dto";
import { Thumb } from "../schemas/thumb.schema";

export abstract class IThumbRepository{
    abstract insertThumb(article:Article, user: User ): Promise<Thumb> ;
    //abstract updateThumb(id :string ,updateThumbDto : UpdateThumbDto):  Promise<Thumb> ;
    abstract deleteThumb(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<Thumb>;
    abstract findAll(): Promise<Thumb[]>;
    abstract findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Thumb[]>;
}