import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from 'src/articles/schemas/article.schema';
import { User } from 'src/users/schemas/user.schema';

export type ThumbDocument = Thumb & Document;

@Schema({ timestamps: true, id:true})
export class Thumb {
 
  
  id: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Article' , required: true  })
  @ApiProperty()
  article: Article;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true })
  @ApiProperty()
  user: User;

}

export const ThumbSchema = SchemaFactory.createForClass(Thumb);
// ThumbSchema.virtual('id').get(function(){
//   return this._id;
// });