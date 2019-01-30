import { INestApplication, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { async } from 'rxjs/internal/scheduler/async';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UserModule } from '../user/user.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, UserModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', async () => {
        const test = await request(app.getHttpServer()).get('/');
       Logger.log('E2E test Done!', 'AppModuleTest')
    });

    afterAll(async done => {
        Logger.log('---- Starting Reminder e2e ----');
        if (app) {
            await app.close();
        }
    });
});
