import { Injectable, NotFoundException } from "@nestjs/common";
import { ArticleService } from "../articles/article.service";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { UserService } from "../users/user.service";
import { IThumbService } from "./abstracts/thumb-service.abstract";
import { CreateThumbDto } from "./dto/create-thumb.dto";
import { Thumb } from "./schemas/thumb.schema";
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
        const deletedThumb = await this.thumbRepository.findOne(id);
        if(!deletedThumb){
            throw new NotFoundException(`Thumb with id ${id} not found`);
        }

        const article =  await this.articleService.findOne(deletedThumb.article.id);
        // update atricle thumbs
        const newAttchedThumbs = 1 - article.totleThumbs ?? 0;
        await this.articleService.updateArticleTotleThumbs(deletedThumb.article.id,newAttchedThumbs);
        return await this.thumbRepository.deleteThumb(id);
    }
    async findOne(id: string): Promise<Thumb> {
        return await this.thumbRepository.findOne(id);
    }
    async findAll(): Promise<Thumb[]> {
        return await this.thumbRepository.findAll();
    }

    async findAllUsing(paginationQueryDto:PaginationQueryDto): Promise<Thumb[]> {
        return await this.thumbRepository.findAllUsing(paginationQueryDto);
    }
    
}