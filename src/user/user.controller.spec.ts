import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('User Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
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
