import {  IsNotEmpty, IsString } from 'class-validator';
export class CreateThumbDto {

    @IsString()
    @IsNotEmpty()
    articleId: string;
    
    @IsString()
    @IsNotEmpty()
    userId: string;
  
}