import { AppConfig } from './config.service';

export const productionConfig: AppConfig = {
    orm: {
        type: 'postgres',
        url: process.env.DATABASE_URL || '',
        synchronize: false,
        logging: true,
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
