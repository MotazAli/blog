import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
export class CreateArticleDto {
   
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    body: string;
  
    @IsString()
    @IsNotEmpty()
    autherUserId: string;

    totleThumbs: number;
  
  }
  