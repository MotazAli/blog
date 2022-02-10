import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsString } from 'class-validator';
export class CreateThumbDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    articleId: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;
  
}