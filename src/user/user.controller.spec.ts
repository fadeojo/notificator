import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('User Controller', () => {
    let module: TestingModule;
    const ormConfig = new ConfigService().getOrmConfig();

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(ormConfig)],
            providers: [
                UserService,
                {
                    provide: 'UserRepository',
                    useValue: UserRepository,
                },
            ],
            controllers: [UserController],
        }).compile();
    });
    it('should be defined', () => {
        const controller: UserController = module.get<UserController>(
            UserController,
        );
        expect(controller).toBeDefined();
    });
});
