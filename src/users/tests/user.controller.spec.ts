// import { Test } from "@nestjs/testing";
// import { Article } from "src/articles/schemas/article.schema";
// import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
// import { CreateUserDto } from "../dto/create-user.dto";
// import { UpdateUserDto } from "../dto/update-user.dto";
// import { User } from "../schemas/user.schema";
// import { UserController } from "../user.controller";
// import { UserService } from "../user.service";

// describe('UserController',()=>{

//     let paginationQueryDto: PaginationQueryDto = {limit:5 , offset: 0 };
//     const userAsGuestStub: User = {id:'123',name:'Motaz Ali',jobTitle:'Engineer', userTypeId:1,articles:[]};
//     const userAsAutherStub: User = {id:'123',name:'Motaz Ali',jobTitle:'Engineer', userTypeId:1,articles:[]};
//     const articleStub : Article = {id:'456' , title:'test article', body:'test body',autherUser:null,totleThumbs:2,comments:[] };
//     const userStubWithArticles: User = {id:'123',name:'Motaz Ali',jobTitle:'Engineer', userTypeId:1,articles:[articleStub]};
//     const userStubWithoutArticles: User = {id:'123',name:'Motaz Ali',jobTitle:'Engineer', userTypeId:1,articles:[]};
    
//     const usersArrayStub = [userAsAutherStub,userAsGuestStub,userStubWithoutArticles]

//     let userController:UserController;
//     let userService: UserService;

    

//     beforeAll(async ()=>{
//         const userServiceMock = {
//             provide: UserService,
//             useFactory: () => ({
//               addUser: jest.fn().mockResolvedValue(userStubWithoutArticles),
//               addUserAsGuest: jest.fn().mockResolvedValue(userAsGuestStub),
//               addUserAsAuther: jest.fn().mockResolvedValue(userAsAutherStub),
//               findAllUsing:  jest.fn().mockResolvedValue(usersArrayStub),
//               findAll: jest.fn().mockResolvedValue(usersArrayStub),
//               findOne: jest.fn().mockResolvedValue(userStubWithoutArticles),
//               updateUser: jest.fn().mockResolvedValue(userStubWithoutArticles),
//               updateUserArticles:jest.fn().mockResolvedValue(userStubWithArticles),
//               deleteUser: jest.fn().mockResolvedValue(true)
//             })
//           }



//         const app = await Test.createTestingModule({
//             controllers:[UserController],
//             providers:[UserService,userServiceMock]
//         }).compile();

//         userController = app.get<UserController>(UserController);
//         userService = app.get<UserService>(UserService);
//     });

//     it('UserController - should be defined', () => {
//         expect(userController).toBeDefined();
//     });

//     it('UserService - should be defined', () => {
//         expect(userService).toBeDefined();
//     });


//     describe('getUserById - method ',()=>{
//         let result:User;

//         beforeEach( async ()=> {
//             result = await userController.getUserBy(userStubWithoutArticles.id);
//         });

//         it('UserService | findOne - method- should be called',()=>{
//             expect(userService.findOne).toBeCalledWith(userStubWithoutArticles.id);
//         });

//         it('it should return user',async ()=>{
//             expect(result).toEqual(userStubWithoutArticles);
//         });
//     });

//     describe('getUsers - method - with query params',()=>{
//         let result:User[];

//         beforeEach( async ()=> {
//             result = await userController.getUsers(paginationQueryDto);
//         });

//         it('UserService | findAllUsing -method - should be called',()=>{
//             expect(userService.findAllUsing).toBeCalledWith(paginationQueryDto);
//         });

//         it('it should return some users',async ()=>{
//             expect(result).toEqual(usersArrayStub);
//         });
        

//     });


//     describe('getUsers - method - without query params',()=>{
//         let result:User[];

//         beforeEach( async ()=> {
//             result = await userController.getUsers();
//         });

//         it('UserService | findAll -method - should be called',()=>{
//             expect(userService.findAll).toBeCalledWith();
//         });

//         it('it should return all users',async ()=>{
//             expect(result).toEqual(usersArrayStub);
//         });
        

//     });


//     describe('addUser - method ',()=>{
//         let result:User;
//         let createUserDto: CreateUserDto;

//         beforeEach( async ()=> {
//             createUserDto = {
//                 userTypeId:userStubWithoutArticles.userTypeId,
//                 name: userStubWithoutArticles.name,
//                 jobTitle:userStubWithoutArticles.jobTitle};
//             result = await userController.addUser(createUserDto);
//         });

//         it('UserService | addUser - method- should be called',()=>{
//             expect(userService.addUser).toBeCalledWith(createUserDto);
//         });

//         it('it should return user',async ()=>{
//             expect(result).toEqual(userStubWithoutArticles);
//         });
//     });

//     describe('addUserAsAuther - method ',()=>{
//         let result:User;
//         let createUserDto: CreateUserDto;

//         beforeEach( async ()=> {
//             createUserDto = {
//                 userTypeId:userAsAutherStub.userTypeId,
//                 name: userAsAutherStub.name,
//                 jobTitle:userAsAutherStub.jobTitle};
//             result = await userController.addUserAsAuther(createUserDto);
//         });

//         it('UserService | addUser - method- should be called',()=>{
//             expect(userService.addUser).toBeCalledWith(createUserDto);
//         });

//         it('it should return user',async ()=>{
//             expect(result).toEqual(userAsAutherStub);
//         });
//     });

    
//     describe('addUserAsGuest - method ',()=>{
//         let result:User;
//         let createUserDto: CreateUserDto;

//         beforeEach( async ()=> {
//             createUserDto = {
//                 userTypeId:userAsGuestStub.userTypeId,
//                 name: userAsGuestStub.name,
//                 jobTitle:userAsGuestStub.jobTitle};
//             result = await userController.addUserAsGuest(createUserDto);
//         });

//         it('UserService | addUser - method- should be called',()=>{
//             expect(userService.addUser).toBeCalledWith(createUserDto);
//         });

//         it('it should return user',async ()=>{
//             expect(result).toEqual(userAsGuestStub);
//         });
//     });


//     describe('updateUser - method ',()=>{
//         let result:User;
//         let updateUserDto: UpdateUserDto;

//         beforeEach( async ()=> {
//             updateUserDto = {
//                 userTypeId:userStubWithoutArticles.userTypeId,
//                 name: userStubWithoutArticles.name,
//                 jobTitle:userStubWithoutArticles.jobTitle};
//             result = await userController.updateUser('123',updateUserDto);
//         });

//         it('UserService | updateUser - method- should be called',()=>{
//             expect(userService.updateUser).toBeCalledWith('123',updateUserDto);
//         });

//         it('it should return user',async ()=>{
//             expect(result).toEqual(userStubWithoutArticles);
//         });
//     });


    
//     describe('deleteUser - method ',()=>{
//         let result:Boolean;

//         beforeEach( async ()=> {
//             result = await userController.deleteUser('123');
//         });

//         it('UserService | deleteUser - method- should be called',()=>{
//             expect(userService.deleteUser).toBeCalledWith('123');
//         });

//         it('it should return true',async ()=>{
//             expect(result).toEqual(true);
//         });
//     });


// });