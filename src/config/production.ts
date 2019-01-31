import { AppConfig } from './config.service';

export const productionConfig: AppConfig = {
    orm: {
        type: 'postgres',
        url: process.env.DATABASE_URL || '',
        synchronize: false,
        logging: true,
        entities: ['./**/*.entity{.ts,.js}'],
        migrations: ['./migration/**/*{.ts,.js}'],
        subscribers: ['./subscriber/**/*{.ts,.js}'],
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
