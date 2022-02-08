import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto{
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    jobTitle: string;

    
    userTypeId: number;
}