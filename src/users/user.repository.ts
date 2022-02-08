import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserRepository } from "./abstracts/user-repository-abstract";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository extends IUserRepository{

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){ super(); }


    async insertUser(createUserDto: CreateUserDto): Promise<User> {

        const createdUser =  new this.userModel(createUserDto);
        return createdUser.save();
        // return new Promise<User>((resolve) => {
        //     let motaz = new User();
        //     motaz.id = "1";
        //     motaz.name = "Motaz";
        //     motaz.jobTitle = "engineer"
        //     resolve(motaz);
        // });
    }


    async updateUser(id: String, updateUserDto: UpdateUserDto): Promise<User> {


        const oldUser = await this.userModel.findByIdAndUpdate(
            { _id: id },
            updateUserDto,
          );
      
          if (!oldUser) {
            throw new NotFoundException(`Customer #${id} not found`);
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
    async deleteUser(id: String): Promise<Boolean> {

        const deletedUser = await this.userModel.findByIdAndRemove(id);
          return (deletedUser)? true : false;
        // return new Promise<Boolean>((resolve) => {
            
        //     resolve(true);
        // });
    }
    async findOne(id: String): Promise<User> {

        const user = await this.userModel
        .findById({ _id: id })
        .exec();

        if (!user) {
        throw new NotFoundException(`user #${id} not found`);
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