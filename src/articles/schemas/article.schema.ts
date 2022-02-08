import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Comment } from 'src/comments/schemas/comment.schema';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true})
export class Article {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  autherUserId: string;

  @Prop()
  totleThumbs: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

}

export const ArticleSchema = SchemaFactory.createForClass(Article);