import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Article } from "src/articles/schemas/article.schema";
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
        // return new Promise<User>((resolve) => {
        //     let motaz = new User();
        //     motaz.id = "1";
        //     motaz.name = "Motaz";
        //     motaz.jobTitle = "engineer"
        //     resolve(motaz);
        // });
    }


    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {


        const oldUser = await this.userModel.findByIdAndUpdate(
          new Types.ObjectId( id),
            updateUserDto,
          );
      
          if (!oldUser) {
            throw new NotFoundException(`User with id${id} not found`);
          }
      
          return oldUser;

        // return new Promise<User>((resolve) => {
        //     let motaz = new User();
        //     motaz.id = "1";
        //     motaz.name = "Motaz";
        //     motaz.jobTitle = "engineer"
        //     resolve(motaz);
        // });
    }


    async updateUserArticles(id: string, articles: Article[]): Promise<User> {
        const oldUser = await this.userModel.findByIdAndUpdate(
          new Types.ObjectId( id),
            {articles:articles},
          );
      
          if (!oldUser) {
            throw new NotFoundException(`User with id ${id} not found`);
          }
      
          return oldUser;
    }


    async deleteUser(id: string): Promise<Boolean> {

        const deletedUser = await this.userModel.findByIdAndRemove( new Types.ObjectId( id));
          return (deletedUser)? true : false;
        // return new Promise<Boolean>((resolve) => {
            
        //     resolve(true);
        // });
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
        // return new Promise<User>((resolve) => {
        //     let motaz = new User();
        //     motaz.id = "1";
        //     motaz.name = "Motaz";
        //     motaz.jobTitle = "engineer"
        //     resolve(motaz);
        // });
    }
    async findAll(): Promise<User[]> {
        return await this.userModel.find();
        // return new Promise<User[]>((resolve) => {
        //     let motaz = new User();
        //     motaz.id = "1";
        //     motaz.name = "Motaz";
        //     motaz.jobTitle = "engineer"
        //     resolve([motaz]);
        // });
    }

}