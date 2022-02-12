import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from '../../articles/schemas/article.schema';
import { User } from '../../users/schemas/user.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true , id: true})
export class Comment {
 
  
  id: string;

  @ApiProperty()
  @Prop({required: true})
  body: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' ,required: true })
  article: Article;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user: User;

  
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
// CommentSchema.virtual('id').get(function(){
//   return this._id;
// });