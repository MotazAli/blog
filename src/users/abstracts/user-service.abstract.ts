import { Article } from "src/articles/schemas/article.schema";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";

export abstract class IUserService{
    abstract addUser(createUserDto : CreateUserDto): Promise<User> ;
    abstract addUserAsGuest(createUserDto : CreateUserDto): Promise<User> ;
    abstract addUserAsAuther(createUserDto : CreateUserDto): Promise<User> ;
    abstract updateUser(id :string ,updateUserDto : UpdateUserDto):  Promise<User> ;
    abstract updateUserArticles(id: string, articles : Article[] ): Promise<User>;
    abstract deleteUser(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<User>;
    abstract findAll(): Promise<User[]>;
}