import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Post,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async find() {
        const users = await this.userService.findAll();
        Logger.log(users, 'User controller');
        return users;
    }

    @Post()
    async create(@Body() userInput: User) {
        try {
            const user = await this.userService.create(userInput);
            Logger.log(user, 'User controller');
            return user;
        } catch (error) {
            Logger.log(error, 'User controller');
            throw new HttpException(error, HttpStatus.FORBIDDEN);
        }
    }
}
