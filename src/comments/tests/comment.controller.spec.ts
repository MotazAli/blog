import { Test } from "@nestjs/testing";
import { Article } from "src/articles/schemas/article.schema";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { User } from "src/users/schemas/user.schema";
import { CommentController } from "../comment.controller";
import { CommentService } from "../comment.service";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { UpdateCommentDto } from "../dto/update.comment.dto";
import { Comment } from "../schemas/comment.schema";

describe('UserController',()=>{

    let paginationQueryDto: PaginationQueryDto = {limit:5 , offset: 0 };
    const userStub: User = {id:'456',name:'Motaz Ali',jobTitle:'Engineer', userTypeId:1,articles:[]};
    const articleStub : Article = {id:'456' , title:'test article', body:'test body',autherUser:null,totleThumbs:2,comments:[] };

    const commentStub: Comment = {
        id:'123',
        body:'comment body',
        user:userStub,
        article:articleStub
    };
    const comment2Stub: Comment = {
        id:'1123',
        body:'comment 2 body',
        user:null,
        article:null
    };
    const commentsArrayStub = [commentStub,comment2Stub]

    let commentController:CommentController;
    let commentService: CommentService;

    

    beforeAll(async ()=>{
        const commentServiceMock = {
            provide: CommentService,
            useFactory: () => ({
              addComment: jest.fn().mockResolvedValue(commentStub),
              findAllUsing:  jest.fn().mockResolvedValue(commentsArrayStub),
              findAll: jest.fn().mockResolvedValue(commentsArrayStub),
              findOne: jest.fn().mockResolvedValue(commentStub),
              updateComment: jest.fn().mockResolvedValue(commentStub),
              deleteComment: jest.fn().mockResolvedValue(true)
            })
          }



        const app = await Test.createTestingModule({
            controllers:[CommentController],
            providers:[CommentService,commentServiceMock]
        }).compile();

        commentController = app.get<CommentController>(CommentController);
        commentService = app.get<CommentService>(CommentService);
    });

    it('vController - should be defined', () => {
        expect(commentController).toBeDefined();
    });

    it('CommentService - should be defined', () => {
        expect(commentService).toBeDefined();
    });


    describe('getCommentById - method ',()=>{
        let result:Comment;

        beforeEach( async ()=> {
            result = await commentController.getCommentById(commentStub.id);
        });

        it('CommentService | findOne - method- should be called',()=>{
            expect(commentService.findOne).toBeCalledWith(commentStub.id);
        });

        it('it should return comment',async ()=>{
            expect(result).toEqual(commentStub);
        });
    });

    describe('getComments - method - with query params',()=>{
        let result:Comment[];

        beforeEach( async ()=> {
            result = await commentController.getComments(paginationQueryDto);
        });

        it('CommentrService | findAllUsing -method - should be called',()=>{
            expect(commentService.findAllUsing).toBeCalledWith(paginationQueryDto);
        });

        it('it should return some comments',async ()=>{
            expect(result).toEqual(commentsArrayStub);
        });
        

    });


    describe('getComments - method - without query params',()=>{
        let result:Comment[];

        beforeEach( async ()=> {
            result = await commentController.getComments();
        });

        it('CommentService | findAll -method - should be called',()=>{
            expect(commentService.findAll).toBeCalledWith();
        });

        it('it should return all comments',async ()=>{
            expect(result).toEqual(commentsArrayStub);
        });
        

    });


    describe('addComment - method ',()=>{
        let result:Comment;
        let createCommentDto: CreateCommentDto;

        beforeEach( async ()=> {
            createCommentDto = {
                body:commentStub.body,
                articleId:commentStub.article.id,
                userId:commentStub.user.id
            };
            result = await commentController.addComment(createCommentDto);
        });

        it('CommentService | addComment - method- should be called',()=>{
            expect(commentService.addComment).toBeCalledWith(createCommentDto);
        });

        it('it should return comment',async ()=>{
            expect(result).toEqual(commentStub);
        });
    });

    


    describe('updateComment - method ',()=>{
        let result:Comment;
        let updateCommentDto: UpdateCommentDto;

        beforeEach( async ()=> {
            updateCommentDto = {
                body:commentStub.body,
                userId:commentStub.user.id,
                articleId:commentStub.article.id
            };
            result = await commentController.updateComment(commentStub.id,updateCommentDto);
        });

        it('CommentService | updateComment - method- should be called',()=>{
            expect(commentService.updateComment).toBeCalledWith(commentStub.id,updateCommentDto);
        });

        it('it should return comment',async ()=>{
            expect(result).toEqual(commentStub);
        });
    });


    
    describe('deleteComment - method ',()=>{
        let result:Boolean;

        beforeEach( async ()=> {
            result = await commentController.deleteComment(commentStub.id);
        });

        it('CommentService | deleteComment - method- should be called',()=>{
            expect(commentService.deleteComment).toBeCalledWith(commentStub.id);
        });

        it('it should return true',async ()=>{
            expect(result).toEqual(true);
        });
    });


});