import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CreateThumbDto } from "./dto/create-thumb.dto";
import { UpdateThumbDto } from "./dto/update-thumb.dto";
import { Thumb } from "./schemas/thumb.schema";
import { ThumbService } from "./thumb.service";

@Controller('thumbs')
export class ThumbController{
    constructor(private thumbsService:ThumbService){}

    @HttpCode(200)
    @Get()
    async getThumbs(): Promise<Thumb[]> {
        return await this.thumbsService.findAll();
    } 

    @HttpCode(200)
    @Get(':id')
    async getThumbById(@Param('id') id : string): Promise<Thumb> {
        return await this.thumbsService.findOne(id);
    } 

    @HttpCode(200)
    @Post()
    async addThumb(@Body() createThumbDto : CreateThumbDto): Promise<Thumb> {
        return await this.thumbsService.addThumb(createThumbDto);
    } 

    @HttpCode(200)
    @Put(':id')
    async updateThumb(@Param('id') id : string ,@Body() updateThumbDto : UpdateThumbDto): Promise<Thumb> {
        return await this.thumbsService.updateThumb(id,updateThumbDto);
    } 

    @HttpCode(200)
    @Delete(':id')
    async delteThumb(@Param('id') id : string): Promise<Boolean> {
        return await this.thumbsService.deleteThumb(id);
    } 

}