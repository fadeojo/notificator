import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserRoles } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query()
    async getUser(@Args('id') id: number): Promise<User> {
        return await this.userService.findOneById(id);
    }

    @Mutation()
    async createUser(@Args('createUserInput') user: User) {
        return await this.userService.create({
            ...user,
            role: UserRoles.User,
        });
    }
}
