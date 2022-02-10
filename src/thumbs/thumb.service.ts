import { Injectable, NotFoundException } from "@nestjs/common";
import { ArticleService } from "src/articles/article.service";
import { UserService } from "src/users/user.service";
import { IThumbService } from "./abstracts/thumb-service.abstract";
import { CreateThumbDto } from "./dto/create-thumb.dto";
import { UpdateThumbDto } from "./dto/update-thumb.dto";
import { Thumb, ThumbDocument } from "./schemas/thumb.schema";
import { ThumbRepository } from "./thumb.repository";

@Injectable()
export class ThumbService extends IThumbService{

    constructor(
        private readonly thumbRepository: ThumbRepository,
        private readonly articleService: ArticleService,
        private readonly userService: UserService
        ){super();}


    async addThumb(createThumbDto: CreateThumbDto): Promise<Thumb> {
        const article = await this.articleService.findOne(createThumbDto.articleId);
        if(!article){
            throw new NotFoundException(`Article with id ${createThumbDto.articleId} not found `);
        }
        const user = await this.userService.findOne(createThumbDto.userId);
        if(!user){
            throw new NotFoundException(`User with id ${createThumbDto.userId} not found `);
        }
        const insertedThumb = await this.thumbRepository.insertThumb(article,user);
        // update atricle thumbs
        const newAttchedThumbs = 1 + article.totleThumbs ?? 0;
        await this.articleService.updateArticleTotleThumbs(createThumbDto.articleId,newAttchedThumbs);
        return insertedThumb;

    }

    // async updateThumb(id: string, updateThumbDto: UpdateThumbDto): Promise<Thumb> {
    //     return await this.thumbRepository.updateThumb(id,updateThumbDto);
    // }

    async deleteThumb(id: string): Promise<Boolean> {
        return await this.thumbRepository.deleteThumb(id);
    }
    async findOne(id: string): Promise<Thumb> {
        return await this.thumbRepository.findOne(id);
    }
    async findAll(): Promise<Thumb[]> {
        return await this.thumbRepository.findAll();
    }
    
}