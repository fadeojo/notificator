import { IsEmail, IsEnum } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
    User = 'User',
    Admin = 'Admin',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    authId: string;

    @IsEnum(UserRoles)
    @Column()
    role: UserRoles;

    @IsEmail()
    @Column()
    email: string;
}
