import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller('users')
export class UserController{
    constructor(private userService: UserService){}

    @ApiQuery({ required:false,name:'offset', schema:{ type: 'number' , example:0} })
    @ApiQuery({ required:false,name:'limit', schema:{ type: 'number' , example:5} })
    @ApiOkResponse({type : User , isArray : true, description: "Response with (Users) as collection of object"})
    @Get()
    async getUsers( @Query() paginationQueryDto:PaginationQueryDto ): Promise<User[]> {
        
        
        if(Object.keys(paginationQueryDto).length==0 ){
            return await this.userService.findAll();
        }
        
        return await this.userService.findAllUsing(paginationQueryDto);
        
    } 

    @ApiOkResponse({type : User, description: "Response with (User) as object" })
    @Get(':id')
    async getUserBy(@Param('id') id : string): Promise<User> {
        return await this.userService.findOne(id);
    } 

    @ApiOkResponse({type : User, description: "Response with (User) as object" })
    @Post()
    async addUser(@Body() createUserDto : CreateUserDto): Promise<User> {
        return await this.userService.addUser(createUserDto);
    } 


    @ApiOkResponse({type : User, description: "Response with (User) as object" })
    @Post('guest')
    async addUserAsGuest(@Body() createUserDto : CreateUserDto): Promise<User> {
        return await this.userService.addUserAsGuest(createUserDto);
    } 

    @ApiOkResponse({type : User, description: "Response with (User) as object" })
    @Post('auther')
    async addUserAsAuther(@Body() createUserDto : CreateUserDto): Promise<User> {
        return await this.userService.addUserAsAuther(createUserDto);
    } 

    @ApiOkResponse({type : User, description: "Response with (User) as object" })
    @ApiNotFoundResponse({description : "Response with error if the User not found"})
    @Put(':id')
    async updateUser(@Param('id') id : string ,@Body() updateUserDto : UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(id,updateUserDto);
    } 

    @ApiOkResponse({type : Boolean , description: "Response with (true) if the User deleted succefuly"  })
    @ApiNotFoundResponse({description : "Response with error if the User not found"})
    @Delete(':id')
    async deleteUser(@Param('id') id : string): Promise<Boolean> {
        return await this.userService.deleteUser(id);
    } 

}