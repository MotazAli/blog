import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from 'src/articles/schemas/article.schema';
import { User } from 'src/users/schemas/user.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true})
export class Comment {
 

  @Prop()
  body: string;

  @Prop()
  articleId: string;

  @Prop()
  userId: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' } })
  article: Article;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user: User;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);