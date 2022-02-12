import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from '../../database/database.service';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let dbConnection : Connection;
  const userStub: User = {
    name:'Motaz Ali',
    jobTitle:'Engineer',
    userTypeId:1
  }
  const user2Stub: User = {
    name:'Mohamed Ali',
    jobTitle:'Engineer',
    userTypeId:1
  }


  beforeAll(async () => {
    const appTestModule= await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dbConnection = appTestModule.get<DatabaseService>(DatabaseService).getDBHandle();
    app = appTestModule.createNestApplication();
    await app.init();    
  });

  afterAll( async ()=> {
    await dbConnection.collection('users').deleteMany({});
    await app.close();
  });

  beforeEach(async()=>{
    await dbConnection.collection('users').deleteMany({});
  });

  describe('/users (GET)',()=>{
      beforeEach(async()=>{
        await dbConnection.collection('users').insertOne(userStub);
        await dbConnection.collection('users').insertOne(user2Stub);
      });
      it('its should return an array of users', async () => {
        const response = await  request(app.getHttpServer())
          .get('/users').query({offset:0 , limit:5});
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([userStub,user2Stub]);
      });
  });

  describe('/users/:id (GET)',()=>{
    let insertedId:string;
    const createdUserDto:CreateUserDto = {
      name:userStub.name,
      jobTitle:userStub.jobTitle,
      userTypeId:userStub.userTypeId
    }
    beforeEach(async()=>{
      insertedId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
    });
    it('its should return user', async () => {
      const response = await  request(app.getHttpServer())
        .get('/users/'+insertedId);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(userStub);
    });
});

  describe('/users (POST)',()=>{
    // beforeEach(async()=>{
    //   await dbConnection.collection('users').insertOne(userStub);
    // });
    it('its should return user', async () => {
      const response = await  request(app.getHttpServer())
        .post('/users').send(userStub);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(userStub);

      //check user in database
      const savedUser = await dbConnection.collection('users').findOne({name:userStub.name});
      expect(savedUser).toMatchObject(userStub);
    });
});

  

describe('/users (PUT)',()=>{
    let insertedId:string;
    const createdUserDto:CreateUserDto = {
      name:userStub.name,
      jobTitle:userStub.jobTitle,
      userTypeId:userStub.userTypeId
    }
    const updateUserDto:UpdateUserDto = {
      name:user2Stub.name,
      jobTitle:user2Stub.jobTitle,
      userTypeId:user2Stub.userTypeId
    }
    beforeEach(async()=>{
      insertedId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
    });
    it('its should return user', async () => {
      
      
      const response = await  request(app.getHttpServer())
        .put('/users/'+insertedId).send(updateUserDto);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(user2Stub);

      //check user in database
      const updatedUser = await dbConnection.collection('users').findOne({name:user2Stub.name});
      expect(updatedUser).toMatchObject(user2Stub);
    });
});

describe('/users (DELETE)',()=>{
  let insertedId:string;
  const createdUserDto:CreateUserDto = {
    name:userStub.name,
    jobTitle:userStub.jobTitle,
    userTypeId:userStub.userTypeId
  }
  beforeEach(async()=>{
    insertedId =  (await dbConnection.collection('users').insertOne(createdUserDto)).insertedId.toHexString();
  });
  it('its should return true', async () => {
    
    
    const response = await  request(app.getHttpServer())
      .delete('/users/'+insertedId);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});

    //check user in database
    const deletedUser = await dbConnection.collection('users').findOne({name:user2Stub.name});
    expect(deletedUser).toBeNull();
  });
});


});
