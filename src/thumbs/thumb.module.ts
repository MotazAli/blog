import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleModule } from "../articles/article.module";
import { UserModule } from "../users/user.module";
import { Thumb, ThumbSchema } from "./schemas/thumb.schema";
import { ThumbController } from "./thumb.controller";
import { ThumbRepository } from "./thumb.repository";
import { ThumbService } from "./thumb.service";

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Thumb.name, schema: ThumbSchema },
        ]),
        ArticleModule,
        UserModule
      ],
    controllers: [ThumbController],
    providers: [ThumbRepository,ThumbService]  
})
export class ThumbModule{}