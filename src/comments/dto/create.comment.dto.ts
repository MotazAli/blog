import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Article } from 'src/articles/schemas/article.schema';
import { User } from 'src/users/schemas/user.schema';
export class CreateCommentDto {
 
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  articleId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

}
