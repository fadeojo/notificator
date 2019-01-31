import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { testConfig } from './test';

describe('ConfigService', () => {
    let service: ConfigService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigService],
        }).compile();
        service = module.get<ConfigService>(ConfigService);
    });
    it('should be defined', () => {
        const ormConfig = testConfig.orm;
        expect(service).toBeDefined();
        expect(service.getOrmConfig()).toEqual({
            ...ormConfig,
            migrations: ['src/migration/**/*{.ts,.js}'],
            subscribers: ['src/subscriber/**/*{.ts,.js}'],
            cli: {
                migrationsDir: 'src/migration',
                subscribersDir: 'src/subscriber',
            },
        });
    });
});
