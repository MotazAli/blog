import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from 'src/articles/schemas/article.schema';
import { User } from 'src/users/schemas/user.schema';

export type ThumbDocument = Thumb & Document;

@Schema({ timestamps: true})
export class Thumb {
 


  @Prop()
  articleId: string;

  @Prop()
  userId: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' } })
  article: Article;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user: User;

}

export const ThumbSchema = SchemaFactory.createForClass(Thumb);