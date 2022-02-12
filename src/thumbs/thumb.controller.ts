import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { CreateThumbDto } from "./dto/create-thumb.dto";
import { Thumb } from "./schemas/thumb.schema";
import { ThumbService } from "./thumb.service";

@ApiTags('Thumbs')
@Controller('thumbs')
export class ThumbController{
    constructor(private thumbsService:ThumbService){}

    @ApiQuery({ required:false,name:'offset', schema:{ type: 'number' , example:0} })
    @ApiQuery({ required:false,name:'limit', schema:{ type: 'number' , example:5} })
    @ApiOkResponse({type : Thumb, isArray : true, description: "Response with (Thumbs) as collection of object" })
    @Get()
    async getThumbs( @Query() paginationQueryDto?:PaginationQueryDto): Promise<Thumb[]> {
        if(!paginationQueryDto || Object.keys(paginationQueryDto).length==0 ){
            return await this.thumbsService.findAll();
        }

        return await this.thumbsService.findAllUsing(paginationQueryDto);

    } 

    @ApiOkResponse({type : Thumb, description: "Response with (Thumb) as object" })
    @Get(':id')
    async getThumbById(@Param('id') id : string): Promise<Thumb> {
        return await this.thumbsService.findOne(id);
    } 

    @ApiOkResponse({type : Thumb, description: "Response with (Thumb) as object" })
    @Post()
    async addThumb(@Body() createThumbDto : CreateThumbDto): Promise<Thumb> {
        return await this.thumbsService.addThumb(createThumbDto);
    } 

    // @HttpCode(200)
    // @Put(':id')
    // async updateThumb(@Param('id') id : string ,@Body() updateThumbDto : UpdateThumbDto): Promise<Thumb> {
    //     return await this.thumbsService.updateThumb(id,updateThumbDto);
    // } 

    @ApiOkResponse({type : Boolean , description: "Response with (true) if the Thumb deleted succefuly"  })
    @ApiNotFoundResponse({description : "Response with error if the Thumb not found"})
    @Delete(':id')
    async deleteThumb(@Param('id') id : string): Promise<Boolean> {
        return await this.thumbsService.deleteThumb(id);
    } 

}