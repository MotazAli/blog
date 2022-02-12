// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../../app.module';
// import { Connection , Schema } from 'mongoose';
// import { DatabaseService } from '../../database/database.service';
// import { Thumb } from '../schemas/thumb.schema';
// import { Article } from 'src/articles/schemas/article.schema';
// import { User } from 'src/users/schemas/user.schema';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
// import { CreateThumbDto } from '../dto/create-thumb.dto';

// describe('ThumbController (e2e)', () => {
//   let app: INestApplication;
//   let dbConnection : Connection;
//   const userStub: User = {
//     name:'Motaz Ali',
//     jobTitle:'Engineer',
//     userTypeId:1
//   }
//   const user2Stub: User = {
//     name:'Mohamed Ali',
//     jobTitle:'Engineer',
//     userTypeId:1
//   }
//   let articleStub:Article={
//       title:'article title',
//       body:'article body',
//       totleThumbs:0,
//       autherUser:userStub,
//   }

//   const thumbStub:Thumb={
//       user:userStub,
//       article:articleStub
//   }

//   const thumb2Stub:Thumb={
//     user:user2Stub,
//     article:articleStub
// }


//   beforeAll(async () => {
//     const appTestModule= await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     dbConnection = appTestModule.get<DatabaseService>(DatabaseService).getDBHandle();
//     app = appTestModule.createNestApplication();
//     await app.init();    
//   });

//   afterAll( async ()=> {
//     await dbConnection.collection('users').deleteMany({});
//     await dbConnection.collection('articles').deleteMany({});
//     await dbConnection.collection('thumbs').deleteMany({});
//     await app.close();
//   });

//   beforeEach(async()=>{
//     await dbConnection.collection('users').deleteMany({});
//     await dbConnection.collection('articles').deleteMany({});
//     await dbConnection.collection('thumbs').deleteMany({});
//   });

//   describe('/thumbs (GET)',()=>{
//     let insertedUserId: string;
//     let insertedArticleId:string;
//       beforeEach(async()=>{
//         const createdUserDto: CreateUserDto = {
//             name:userStub.name,
//             jobTitle:userStub.jobTitle,
//             userTypeId:userStub.userTypeId
//         };
//         const createdUser2Dto: CreateUserDto = {
//             name:user2Stub.name,
//             jobTitle:user2Stub.jobTitle,
//             userTypeId:user2Stub.userTypeId
//         };  
//         insertedUserId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
//         const insertedUser2Id =  (await dbConnection.collection('users').insertOne(createdUser2Dto)).insertedId.toHexString();
//         const createdArticleDto: CreateArticleDto= {
//             autherUserId:insertedUserId,
//             body:articleStub.body,
//             title:articleStub.title,
//             totleThumbs:articleStub.totleThumbs
//         };
//         insertedArticleId=  (await dbConnection.collection('articles').insertOne(createdArticleDto)).insertedId.toHexString();
//         const createthumbDto : CreateThumbDto = {
//             userId:insertedUserId,
//             articleId:insertedArticleId
//         };
//         await dbConnection.collection('thumbs').insertOne(createthumbDto);
//       });
//       it('its should return an array of thumbs', async () => {
//         const response = await  request(app.getHttpServer())
//           .get('/thumbs').query({offset:0 , limit:5});
//         expect(response.status).toBe(200);
//         expect(response.body).toMatchObject([{userId:insertedUserId,
//             articleId:insertedArticleId}]);
//       });
//   });

//   describe('/thumbs/:id (GET)',()=>{
//     let insertedThumbId : string;
//     let insertedUserId: string;
//     let insertedArticleId:string;
//     beforeEach(async()=>{
//         const createdUserDto: CreateUserDto = {
//             name:userStub.name,
//             jobTitle:userStub.jobTitle,
//             userTypeId:userStub.userTypeId
//         };
//         // const createdUser2Dto: CreateUserDto = {
//         //     name:user2Stub.name,
//         //     jobTitle:user2Stub.jobTitle,
//         //     userTypeId:user2Stub.userTypeId
//         // };  
//         insertedUserId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
//         //const insertedUser2Id =  (await dbConnection.collection('users').insertOne(createdUser2Dto)).insertedId.toHexString();
//         const createdArticleDto: CreateArticleDto= {
//             autherUserId:insertedUserId,
//             body:articleStub.body,
//             title:articleStub.title,
//             totleThumbs:articleStub.totleThumbs
//         };
//         insertedArticleId=  (await dbConnection.collection('articles').insertOne(createdArticleDto)).insertedId.toHexString();
//         const createthumbDto : CreateThumbDto = {
//             userId:insertedUserId,
//             articleId:insertedArticleId
//         };
//         insertedThumbId =  (await dbConnection.collection('thumbs').insertOne(createthumbDto)).insertedId.toHexString();
//     });
//     it('its should return thumbs', async () => {
//       const response = await  request(app.getHttpServer())
//         .get('/thumbs/'+insertedThumbId);
//       expect(response.status).toBe(200);
//       expect(response.body).toMatchObject({userId:insertedUserId,
//         articleId:insertedArticleId});
//     });
// });



//   describe('/thumbs (POST)',()=>{
//     let insertedThumbId : string;
//     let insertedUserId: string;
//     let insertedArticleId:string;
//     beforeEach(async()=>{
//         const createdUserDto: CreateUserDto = {
//             name:userStub.name,
//             jobTitle:userStub.jobTitle,
//             userTypeId:userStub.userTypeId
//         };
//         // const createdUser2Dto: CreateUserDto = {
//         //     name:user2Stub.name,
//         //     jobTitle:user2Stub.jobTitle,
//         //     userTypeId:user2Stub.userTypeId
//         // };  
//         insertedUserId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
//         //const insertedUser2Id =  (await dbConnection.collection('users').insertOne(createdUser2Dto)).insertedId.toHexString();
//         const createdArticleDto: CreateArticleDto= {
//             autherUserId:insertedUserId,
//             body:articleStub.body,
//             title:articleStub.title,
//             totleThumbs:articleStub.totleThumbs
//         };
//         insertedArticleId=  (await dbConnection.collection('articles').insertOne(createdArticleDto)).insertedId.toHexString();
        
//         //insertedThumbId =  (await dbConnection.collection('thumbs').insertOne(createthumbDto)).insertedId.toHexString();
//     });
//     it('its should return thumb', async () => {
//         const createthumbDto : CreateThumbDto = {
//             userId:insertedUserId,
//             articleId:insertedArticleId
//         };
//       const response = await  request(app.getHttpServer())
//         .post('/thumbs').send(createthumbDto);
//       console.log(response.body);
//       expect(response.status).toBe(201);
//       expect(response.body).not.toBeNull();
//       insertedThumbId = (response.body as {_id:string})._id;
//       console.log(insertedThumbId);
//       //check user in database
      
//       const savedThumb = await dbConnection.collection('thumbs').findOne({_id:insertedThumbId});
//       expect(savedThumb).toMatchObject(thumbStub);
//     });
// });

  

// // describe('/users (PUT)',()=>{
// //     let insertedId:string;
// //     const createdUserDto:CreateUserDto = {
// //       name:userStub.name,
// //       jobTitle:userStub.jobTitle,
// //       userTypeId:userStub.userTypeId
// //     }
// //     const updateUserDto:UpdateUserDto = {
// //       name:user2Stub.name,
// //       jobTitle:user2Stub.jobTitle,
// //       userTypeId:user2Stub.userTypeId
// //     }
// //     beforeEach(async()=>{
// //       insertedId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
// //     });
// //     it('its should return user', async () => {
      
      
// //       const response = await  request(app.getHttpServer())
// //         .put('/users/'+insertedId).send(updateUserDto);
// //       expect(response.status).toBe(200);
// //       expect(response.body).toMatchObject(user2Stub);

// //       //check user in database
// //       const updatedUser = await dbConnection.collection('users').findOne({name:user2Stub.name});
// //       expect(updatedUser).toMatchObject(user2Stub);
// //     });
// // });

// describe('/thumbs (DELETE)',()=>{
//     let insertedThumbId : string;
//     let insertedUserId: string;
//     let insertedArticleId:string;
//     beforeEach(async()=>{
//         const createdUserDto: CreateUserDto = {
//             name:userStub.name,
//             jobTitle:userStub.jobTitle,
//             userTypeId:userStub.userTypeId
//         };
//         // const createdUser2Dto: CreateUserDto = {
//         //     name:user2Stub.name,
//         //     jobTitle:user2Stub.jobTitle,
//         //     userTypeId:user2Stub.userTypeId
//         // };  
//         insertedUserId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
//         //const insertedUser2Id =  (await dbConnection.collection('users').insertOne(createdUser2Dto)).insertedId.toHexString();
//         const createdArticleDto: CreateArticleDto= {
//             autherUserId:insertedUserId,
//             body:articleStub.body,
//             title:articleStub.title,
//             totleThumbs:articleStub.totleThumbs
//         };
//         insertedArticleId=  (await dbConnection.collection('articles').insertOne(createdArticleDto)).insertedId.toHexString();
//         const createthumbDto : CreateThumbDto = {
//             userId:insertedUserId,
//             articleId:insertedArticleId
//         };
//         insertedThumbId =  (await dbConnection.collection('thumbs').insertOne(createthumbDto)).insertedId.toHexString();
//     });
//   it('its should return true', async () => {
    
    
//     const response = await  request(app.getHttpServer())
//       .delete('/thumbs/'+insertedThumbId);
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({});

//     //check thumb in database
//     const deletedThumb = await dbConnection.collection('thumbs').findOne({userId:insertedUserId});
//     expect(deletedThumb).toBeNull();
//   });
// });


// });
