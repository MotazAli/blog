import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateArticleDto {
   
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    autherUserId: string;

    @ApiProperty({required : false})
    totleThumbs?: number;
  
  }
  