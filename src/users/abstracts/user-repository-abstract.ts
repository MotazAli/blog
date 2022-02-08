import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";

export abstract class IUserRepository{
    abstract insertUser(createUserDto : CreateUserDto): Promise<User> ;
    abstract updateUser(id :String ,updateUserDto : UpdateUserDto):  Promise<User> ;
    abstract deleteUser(id:String): Promise<Boolean>;
    abstract findOne(id:String):  Promise<User>;
    abstract findAll(): Promise<User[]>;
}