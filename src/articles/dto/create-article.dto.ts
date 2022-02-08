import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export class CreateArticleDto {
   
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    body: string;
  
    autherUserId: string;
    totleThumbs: number;
  
  }
  