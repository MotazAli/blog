import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Article } from "src/articles/schemas/article.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { IUserRepository } from "./abstracts/user-repository.abstract";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository extends IUserRepository{
    

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){ super(); }


    async insertUser(createUserDto: CreateUserDto): Promise<User> {

        const createdUser =  new this.userModel(createUserDto);
        return await createdUser.save();
  
    }


    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {


        const oldUser = await this.userModel.findByIdAndUpdate(
          new Types.ObjectId( id),
            updateUserDto,
            {new:true}
          );
      
          if (!oldUser) {
            throw new NotFoundException(`User with id${id} not found`);
          }
      
          return oldUser;
    }


    async updateUserArticles(id: string, articles: Article[]): Promise<User> {
        const oldUser = await this.userModel.findByIdAndUpdate(
          new Types.ObjectId( id),
            {articles:articles},
            {new:true}
          );
      
          if (!oldUser) {
            throw new NotFoundException(`User with id ${id} not found`);
          }
      
          return oldUser;
    }


    async deleteUser(id: string): Promise<Boolean> {

        const deletedUser = await this.userModel.findByIdAndRemove( new Types.ObjectId( id));
          return (deletedUser)? true : false;
        
    }
    async findOne(id: string): Promise<User> {

        const user = await this.userModel
        .findById( new Types.ObjectId( id))
        .populate('articles')
        .exec();

        if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
        
    }

    async findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<User[]>{
      const { limit, offset } = paginationQueryDto;
      return await this.userModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();;
    }

}