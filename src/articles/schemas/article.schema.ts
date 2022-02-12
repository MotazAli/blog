import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document ,ObjectId} from 'mongoose';
import { Comment } from '../../comments/schemas/comment.schema';
import { User } from '../../users/schemas/user.schema';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true, id:true})
export class Article {

  // @Prop({ type: { type: mongoose.Schema.Types.ObjectId } })
  // _id: ObjectId;

  
  //@ApiProperty()
  //@Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;

  @ApiProperty()
  @Prop({required: true})
  title: string;

  @ApiProperty()
  @Prop({required: true})
  body: string;

  @ApiProperty()
  @Prop()
  totleThumbs: number;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true })
  autherUser: User;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments?: Comment[];

}

export const ArticleSchema = SchemaFactory.createForClass(Article);
// .virtual('id').get(function(){
//   return this._id;
// });

