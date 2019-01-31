import { AppConfig } from './config.service';

export const developmentConfig: AppConfig = {
    orm: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'notificator_dev',
        synchronize: false,
        logging: true,
        entities: ['src/**/*.entity{.ts,.js}'],
        migrations: ['src/migration/**/*{.ts,.js}'],
        subscribers: ['src/subscriber/**/*{.ts,.js}'],
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
