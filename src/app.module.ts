import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './articles/article.module';
import { CommentModule } from './comments/comment.module';
import { DatabaseModule } from './database/database.module';
import { ThumbModule } from './thumbs/thumb.module';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [ 
    //MongooseModule.forRoot('mongodb://localhost/blog'),
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    UserModule,
    ArticleModule,
    CommentModule,
    ThumbModule,
    DatabaseModule
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
