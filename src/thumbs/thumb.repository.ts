import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Article } from "src/articles/schemas/article.schema";
import { User } from "src/users/schemas/user.schema";
import { IThumbRepository } from "./abstracts/thumb-repository.abstract";
import { CreateThumbDto } from "./dto/create-thumb.dto";
import { UpdateThumbDto } from "./dto/update-thumb.dto";
import { Thumb, ThumbDocument } from "./schemas/thumb.schema";

@Injectable()
export class ThumbRepository extends IThumbRepository{

    constructor(@InjectModel(Thumb.name) private thumbModel: Model<ThumbDocument>){super();}


    async insertThumb( article:Article, user: User): Promise<Thumb> {
        const newThumb = new this.thumbModel({ article, user});
        return newThumb.save();
    }

    // async updateThumb(id: string, updateThumbDto: UpdateThumbDto): Promise<Thumb> {
    //     const updatedThumb = await this.thumbModel.findByIdAndUpdate({_id:id},updateThumbDto);
    //     if(!updatedThumb){
    //         throw new NotFoundException(`Thumb with id ${id} not found`); 
    //     }
    //     return updatedThumb;
    // }

    async deleteThumb(id: string): Promise<Boolean> {
        const deletedThumb = await this.thumbModel.findByIdAndDelete(new Types.ObjectId( id));
        return deletedThumb? true: false;
    }
    async findOne(id: string): Promise<Thumb> {
        const Thumb = await this.thumbModel
        .findById(new Types.ObjectId( id))
        .populate('article')
        .populate('user')
        .exec();
        if(!Thumb){
            throw new NotFoundException(`Thumb with id ${id} not found`); 
        }
        return Thumb;
    }
    async findAll(): Promise<Thumb[]> {
        return await this.thumbModel.find().exec();
    }
    
}