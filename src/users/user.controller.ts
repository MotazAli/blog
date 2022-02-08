import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";


@Controller('users')
export class UserController{
    constructor(private userService: UserService){}

    @HttpCode(200)
    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.findAll();
    } 

    @HttpCode(200)
    @Get(':id')
    async getUserBy(@Param('id') id : String): Promise<User> {
        return await this.userService.findOne(id);
    } 

    @HttpCode(200)
    @Post()
    async addUser(@Body() createUserDto : CreateUserDto): Promise<User> {
        return await this.userService.addUser(createUserDto);
    } 

    @HttpCode(200)
    @Put(':id')
    async updateUser(@Param('id') id : String ,@Body() updateUserDto : UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(id,updateUserDto);
    } 

    @HttpCode(200)
    @Delete(':id')
    async delteUser(@Param('id') id : String): Promise<Boolean> {
        return await this.userService.deleteUser(id);
    } 

}