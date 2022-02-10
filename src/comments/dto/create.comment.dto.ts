import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Article } from 'src/articles/schemas/article.schema';
import { User } from 'src/users/schemas/user.schema';
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
