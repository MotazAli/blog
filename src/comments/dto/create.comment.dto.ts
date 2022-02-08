import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export class CreateCommentDto {
 
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  articleId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

}
