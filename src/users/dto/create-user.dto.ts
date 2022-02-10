import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Article } from 'src/articles/schemas/article.schema';
export class CreateUserDto{
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    jobTitle: string;

    
    userTypeId: number;

    articles:  Article[];
}