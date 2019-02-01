import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Post,
    Request,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async find(@Request() req: Express.Request) {
        const users = await this.userService.findAll();
        return users;
    }

    @Post()
    async create(@Body() userInput: User) {
        try {
            const user = await this.userService.create(userInput);
            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.FORBIDDEN);
        }
    }
}
