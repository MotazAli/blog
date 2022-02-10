import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { Comment } from "./schemas/comment.schema";

@ApiTags('Comments')
@Controller('comments')
export class CommentController{
    constructor(private commentService:CommentService){}

    @ApiQuery({ required:false,name:'offset', schema:{ type: 'number' , example:0} })
    @ApiQuery({ required:false,name:'limit', schema:{ type: 'number' , example:5} })
    @ApiOkResponse({type : Comment, isArray : true, description: "Response with (Comments) as collection of object" })
    @Get()
    async getComments( @Query() paginationQueryDto:PaginationQueryDto): Promise<Comment[]> {
        if(Object.keys(paginationQueryDto).length==0 ){
            return await this.commentService.findAll();
        }
        return await this.commentService.findAllUsing(paginationQueryDto);
    } 

    @ApiOkResponse({type : Comment, description: "Response with (Comment) as object" })
    @Get(':id')
    async getCommentById(@Param('id') id : string): Promise<Comment> {
        return await this.commentService.findOne(id);
    } 

    @ApiOkResponse({type : Comment, description: "Response with (Comment) as object" })
    @Post()
    async addComment(@Body() createCommentDto : CreateCommentDto): Promise<Comment> {
        return await this.commentService.addComment(createCommentDto);
    } 

    @ApiOkResponse({type : Comment, description: "Response with (Comment) as object" })
    @ApiNotFoundResponse({description : "Response with error if the comment not found"})
    @Put(':id')
    async updateComment(@Param('id') id : string ,@Body() updateCommentDto : UpdateCommentDto): Promise<Comment> {
        return await this.commentService.updateComment(id,updateCommentDto);
    } 

    @ApiOkResponse({type : Boolean, description: "Response with (true) if the comment deleted successfly" })
    @ApiNotFoundResponse({description : "Response with error if the comment not found"})
    @Delete(':id')
    async deleteComment(@Param('id') id : string): Promise<Boolean> {
        return await this.commentService.deleteComment(id);
    } 

}