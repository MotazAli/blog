import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleModule } from "../articles/article.module";
import { UserModule } from "../users/user.module";
import { CommentController } from "./comment.controller";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";
import { Comment, CommentSchema } from "./schemas/comment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Comment.name, schema: CommentSchema },
        ]),
        ArticleModule,
        UserModule
      ],
    controllers: [CommentController],
    providers: [CommentRepository,CommentService]  
})
export class CommentModule{}