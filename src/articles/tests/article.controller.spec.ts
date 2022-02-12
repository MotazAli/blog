import { Test } from "@nestjs/testing";
import { Comment } from "../../comments/schemas/comment.schema";
import { Article } from "../../articles/schemas/article.schema";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import { User } from "../../users/schemas/user.schema";
import { ArticleController } from "../article.controller";
import { ArticleService } from "../article.service";
import { CreateArticleDto } from "../dto/create-article.dto";
import { UpdateArticleDto } from "../dto/update-article.dto";

describe('UserController',()=>{

    let paginationQueryDto: PaginationQueryDto = {limit:5 , offset: 0 };
    const userStub: User = {id:'456',name:'Motaz Ali',jobTitle:'Engineer', userTypeId:1,articles:[]};
    const commentStub: Comment = {
        id:'123',
        body:'comment body',
        user:userStub,
        article:null
    };
    const comment2Stub: Comment = {
        id:'1123',
        body:'comment 2 body',
        user:userStub,
        article:null
    };
    const commentsArrayStub = [commentStub,comment2Stub];
    const articleStub : Article = {
        id:'456', 
        title:'test article', 
        body:'test body',
        autherUser:userStub,
        totleThumbs:2,
        comments:commentsArrayStub
    };
    const article2Stub : Article = {
        id:'4456', 
        title:'test article 2', 
        body:'test body 2',
        autherUser:null,
        totleThumbs:1,
        comments:[]
    };


    
    const articlesArrayStub = [articleStub,article2Stub]

    let articleController:ArticleController;
    let articleService: ArticleService;

    

    beforeAll(async ()=>{
        const articleServiceMock = {
            provide: ArticleService,
            useFactory: () => ({
              addArticle: jest.fn().mockResolvedValue(articleStub),
              findAllUsing:  jest.fn().mockResolvedValue(articlesArrayStub),
              findAll: jest.fn().mockResolvedValue(articlesArrayStub),
              findOne: jest.fn().mockResolvedValue(articleStub),
              updateArticle: jest.fn().mockResolvedValue(articleStub),
              deleteArticle: jest.fn().mockResolvedValue(true)
            })
          }



        const app = await Test.createTestingModule({
            controllers:[ArticleController],
            providers:[ArticleService,articleServiceMock]
        }).compile();

        articleController = app.get<ArticleController>(ArticleController);
        articleService = app.get<ArticleService>(ArticleService);
    });

    it('ArticleController - should be defined', () => {
        expect(articleController).toBeDefined();
    });

    it('ArticleService - should be defined', () => {
        expect(articleService).toBeDefined();
    });


    describe('getArticleById - method ',()=>{
        let result:Article;

        beforeEach( async ()=> {
            result = await articleController.getArticleById(articleStub.id);
        });

        it('ArticleService | findOne - method- should be called',()=>{
            expect(articleService.findOne).toBeCalledWith(articleStub.id);
        });

        it('it should return article',async ()=>{
            expect(result).toEqual(articleStub);
        });
    });

    describe('getArticles - method - with query params',()=>{
        let result:Article[];

        beforeEach( async ()=> {
            result = await articleController.getArticles(paginationQueryDto);
        });

        it('ArticlerService | findAllUsing -method - should be called',()=>{
            expect(articleService.findAllUsing).toBeCalledWith(paginationQueryDto);
        });

        it('it should return some articles',async ()=>{
            expect(result).toEqual(articlesArrayStub);
        });
        

    });


    describe('getArticles - method - without query params',()=>{
        let result:Article[];

        beforeEach( async ()=> {
            result = await articleController.getArticles();
        });

        it('articleService | findAll -method - should be called',()=>{
            expect(articleService.findAll).toBeCalledWith();
        });

        it('it should return all articles',async ()=>{
            expect(result).toEqual(articlesArrayStub);
        });
        

    });


    describe('addArticle - method ',()=>{
        let result:Article;
        let createArticleDto: CreateArticleDto;

        beforeEach( async ()=> {
            createArticleDto = {
                body:articleStub.body,
                title:articleStub.title,
                autherUserId:articleStub.autherUser.id,
                totleThumbs:articleStub.totleThumbs
            };
            result = await articleController.addArticle(createArticleDto);
        });

        it('articleService | addArticle - method- should be called',()=>{
            expect(articleService.addArticle).toBeCalledWith(createArticleDto);
        });

        it('it should return article',async ()=>{
            expect(result).toEqual(articleStub);
        });
    });

    


    describe('updateArticle - method ',()=>{
        let result:Article;
        let updateArticleDto: UpdateArticleDto;

        beforeEach( async ()=> {
            updateArticleDto = {
                body:articleStub.body,
                title:articleStub.title,
                autherUserId:articleStub.autherUser.id,
                totleThumbs:articleStub.totleThumbs
            };
            result = await articleController.updateArticle(articleStub.id,updateArticleDto);
        });

        it('articleService | updateArticle - method- should be called',()=>{
            expect(articleService.updateArticle).toBeCalledWith(articleStub.id,updateArticleDto);
        });

        it('it should return article',async ()=>{
            expect(result).toEqual(articleStub);
        });
    });


    
    describe('deleteArticle - method ',()=>{
        let result:Boolean;

        beforeEach( async ()=> {
            result = await articleController.deleteArticle(articleStub.id);
        });

        it('articleService | deleteArticle - method- should be called',()=>{
            expect(articleService.deleteArticle).toBeCalledWith(articleStub.id);
        });

        it('it should return true',async ()=>{
            expect(result).toEqual(true);
        });
    });


});