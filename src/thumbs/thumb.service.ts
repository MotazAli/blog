import { Injectable } from "@nestjs/common";
import { IThumbService } from "./abstracts/thumb-service-abstract";
import { CreateThumbDto } from "./dto/create-thumb.dto";
import { UpdateThumbDto } from "./dto/update-thumb.dto";
import { Thumb, ThumbDocument } from "./schemas/thumb.schema";
import { ThumbRepository } from "./thumb.repository";

@Injectable()
export class ThumbService extends IThumbService{

    constructor(private thumbRepository: ThumbRepository){super();}


    async addThumb(createThumbDto: CreateThumbDto): Promise<Thumb> {
        return await this.thumbRepository.insertThumb(createThumbDto);
    }

    async updateThumb(id: string, updateThumbDto: UpdateThumbDto): Promise<Thumb> {
        return await this.thumbRepository.updateThumb(id,updateThumbDto);
    }

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