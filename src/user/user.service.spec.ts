import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    const ormConfig = new ConfigService().getOrmConfig();

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(ormConfig),
                TypeOrmModule.forFeature([User]),
            ],
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
