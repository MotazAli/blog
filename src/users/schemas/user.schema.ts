import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from 'src/articles/schemas/article.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true , id:true})
export class User {

  
  // @Prop({_id})
  id?: string;

  @ApiProperty()
  @Prop({required: true})
  name: string;

  @ApiProperty()
  @Prop({required: true})
  jobTitle: string;

  @ApiProperty()
  @Prop({required: true})
  userTypeId: number;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]})
  articles?: Article[];

}



export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.virtual('id').get(function(){
//   return this._id;
// });

//module.exports = UserSchema;