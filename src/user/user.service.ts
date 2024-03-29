import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, ValidationError } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({ take: 5 });
    }

    async findOneById(id: number): Promise<User> {
        return this.userRepository.findOneOrFail(id);
    }

    async create(user: User): Promise<User | ValidationError[]> {
        const errors = await validate(user);
        if (errors.length > 0) {
            throw errors;
        }
        return await this.userRepository.save(user);
    }
}
