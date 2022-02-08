import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { Comment } from "./schemas/comment.schema";

@Controller('comments')
export class CommentController{
    constructor(private commentService:CommentService){}

    @HttpCode(200)
    @Get()
    async getComments(): Promise<Comment[]> {
        return await this.commentService.findAll();
    } 

    @HttpCode(200)
    @Get(':id')
    async getCommentById(@Param('id') id : string): Promise<Comment> {
        return await this.commentService.findOne(id);
    } 

    @HttpCode(200)
    @Post()
    async addComment(@Body() createCommentDto : CreateCommentDto): Promise<Comment> {
        return await this.commentService.addComment(createCommentDto);
    } 

    @HttpCode(200)
    @Put(':id')
    async updateComment(@Param('id') id : string ,@Body() updateCommentDto : UpdateCommentDto): Promise<Comment> {
        return await this.commentService.updateComment(id,updateCommentDto);
    } 

    @HttpCode(200)
    @Delete(':id')
    async delteComment(@Param('id') id : string): Promise<Boolean> {
        return await this.commentService.deleteComment(id);
    } 

}