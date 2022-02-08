import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleController } from "./article.controller";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";
import { Article, ArticleSchema } from "./schemas/article.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Article.name, schema: ArticleSchema },
        ]),
      ],
    controllers: [ArticleController],
    providers: [ArticleRepository,ArticleService]  
})
export class ArticleModule{}