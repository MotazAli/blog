import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Comment } from 'src/comments/schemas/comment.schema';
import { User } from 'src/users/schemas/user.schema';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true})
export class Article {

  // @Prop({ type: { type: mongooseSchema.Types.ObjectId } })
  // _id: ObjectId;

  // @Prop()
  // _id: string;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  body: string;

  @Prop()
  totleThumbs: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true })
  autherUser: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments?: Comment[];

}

export const ArticleSchema = SchemaFactory.createForClass(Article);