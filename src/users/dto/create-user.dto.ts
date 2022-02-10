import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Article } from 'src/articles/schemas/article.schema';
export class CreateUserDto{
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    jobTitle: string;

    @ApiProperty({required : false})
    userTypeId?: number;

    //articles:  Article[];
}