import { Test } from "@nestjs/testing";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { CreateThumbDto } from "../dto/create-thumb.dto";
import { Thumb } from "../schemas/thumb.schema";
import { ThumbController } from "../thumb.controller";
import { ThumbService } from "../thumb.service";

describe('ThumbController',()=>{

    let paginationQueryDto: PaginationQueryDto = {limit:5 , offset: 0 };
    
    const thumbStub: Thumb = {
        id:'123',
        article:{id:'456',title:'article title',body:'article body',totleThumbs:2,autherUser:null},
        user:{id:'111',name:'Motaz Ali',articles:[],userTypeId:1,jobTitle:'Engineer'}};
        const thumb2Stub: Thumb = {id:'123',article:null,user:null};
    const thumbsArrayStub = [thumbStub,thumb2Stub];

    let thumbController:ThumbController;
    let thumbService: ThumbService;

    

    beforeAll(async ()=>{
        const thumbServiceMock = {
            provide: ThumbService,
            useFactory: () => ({
              addThumb: jest.fn().mockResolvedValue(thumbStub),
              findAllUsing:  jest.fn().mockResolvedValue(thumbsArrayStub),
              findAll: jest.fn().mockResolvedValue(thumbsArrayStub),
              findOne: jest.fn().mockResolvedValue(thumbStub),
              updateThumb: jest.fn().mockResolvedValue(thumbStub),
              deleteThumb: jest.fn().mockResolvedValue(true)
            })
          }



        const app = await Test.createTestingModule({
            controllers:[ThumbController],
            providers:[ThumbService,thumbServiceMock]
        }).compile();

        thumbController = app.get<ThumbController>(ThumbController);
        thumbService = app.get<ThumbService>(ThumbService);
    });

    it('ThumbController - should be defined', () => {
        expect(thumbController).toBeDefined();
    });

    it('ThumbService - should be defined', () => {
        expect(thumbService).toBeDefined();
    });

    describe('getThumbs - method - with query params',()=>{
        let result:Thumb[];

        beforeEach( async ()=> {
            result = await thumbController.getThumbs(paginationQueryDto);
        });

        it('UserService | findAllUsing -method - should be called',()=>{
            expect(thumbService.findAllUsing).toBeCalledWith(paginationQueryDto);
        });

        it('it should return some thumbs',async ()=>{
            expect(result).toEqual(thumbsArrayStub);
        });
        

    });


    describe('getThumbs - method - without query params',()=>{
        let result:Thumb[];

        beforeEach( async ()=> {
            result = await thumbController.getThumbs();
        });

        it('ThumbService | findAll -method - should be called',()=>{
            expect(thumbService.findAll).toBeCalledWith();
        });

        it('it should return all thumbs',async ()=>{
            expect(result).toEqual(thumbsArrayStub);
        });
        

    });


    describe('addThumb - method ',()=>{
        let result:Thumb;
        let createThumbDto: CreateThumbDto;

        beforeEach( async ()=> {
            createThumbDto = {
                userId:thumbStub.user.id,
                articleId:thumbStub.article.id
            };
            result = await thumbController.addThumb(createThumbDto);
        });

        it('ThumbService | addThumb - method- should be called',()=>{
            expect(thumbService.addThumb).toBeCalledWith(createThumbDto);
        });

        it('it should return thumb',async ()=>{
            expect(result).toEqual(thumbStub);
        });
    });

    describe('getThumbById - method ',()=>{
        let result:Thumb;

        beforeEach( async ()=> {
            result = await thumbController.getThumbById(thumbStub.id);
        });

        it('ThumbService | findOne - method- should be called',()=>{
            expect(thumbService.findOne).toBeCalledWith(thumbStub.id);
        });

        it('it should return thumb',async ()=>{
            expect(result).toEqual(thumbStub);
        });
    });

    
    describe('deleteThumb - method ',()=>{
        let result:Boolean;

        beforeEach( async ()=> {
            result = await thumbController.deleteThumb(thumbStub.id);
        });

        it('UserService | deleteUser - method- should be called',()=>{
            expect(thumbService.deleteThumb).toBeCalledWith(thumbStub.id);
        });

        it('it should return true',async ()=>{
            expect(result).toEqual(true);
        });
    });


});