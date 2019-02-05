import { IsEmail, IsEnum } from 'class-validator';
import { UserRoles } from '../user.entity';

export class CreateUserDto {
    id?: number;

    authId: string;

    @IsEnum(UserRoles)
    role: UserRoles;

    @IsEmail()
    email: string;
}
