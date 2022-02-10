import { Injectable } from "@nestjs/common";
import { Article } from "src/articles/schemas/article.schema";
import { UserType } from "src/utilities/enums";
import { IUserService } from "./abstracts/user-service.abstract";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService extends IUserService{

    constructor(private userRepository: UserRepository){ super(); }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        
        return await this.userRepository.insertUser(createUserDto);
    }


    async addUserAsGuest(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.userTypeId = UserType.GUEST.valueOf();
        return await this.userRepository.insertUser(createUserDto);
    }

    async addUserAsAuther(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.userTypeId = UserType.AUTHER.valueOf();
        return await this.userRepository.insertUser(createUserDto);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userRepository.updateUser(id,updateUserDto);
    }


    async updateUserArticles(id: string, articles : Article[] ): Promise<User> {
        return await this.userRepository.updateUserArticles(id,articles);
    }

    async deleteUser(id: string): Promise<Boolean> {
        return await this.userRepository.deleteUser(id);
    }
    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

}