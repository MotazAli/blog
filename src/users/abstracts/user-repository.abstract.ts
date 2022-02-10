import { Article } from "src/articles/schemas/article.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";

export abstract class IUserRepository{
    abstract insertUser(createUserDto : CreateUserDto): Promise<User> ;
    abstract updateUser(id :string ,updateUserDto : UpdateUserDto): Promise<User>;
    abstract updateUserArticles(id: string, articles : Article[] ): Promise<User>;
    abstract deleteUser(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<User[]>;
}