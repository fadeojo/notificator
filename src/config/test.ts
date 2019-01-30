import { AppConfig } from './config.service';

export const testConfig: AppConfig = {
    orm: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'notificator_test',
        synchronize: true,
        entities: ['src/**/*.entity.ts'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
        cli: {
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    },
    auth: {
        jwksUri: process.env.NOTIFICATOR_JWKSURI,
        audience: process.env.AUDIENCE,
        issuer: process.env.ISSUER,
    },
};
