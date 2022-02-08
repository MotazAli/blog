import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from 'src/articles/schemas/article.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true})
export class User {
  @Prop()
  name: string;

  @Prop()
  jobTitle: string;

  @Prop()
  userTypeId: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]})
  articles: Article[];

}

export const UserSchema = SchemaFactory.createForClass(User);