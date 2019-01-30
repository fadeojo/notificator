import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormConfig from '../../ormconfig.json';
import { AppConfig } from './config.service';

export const developmentConfig: AppConfig = {
    orm: ormConfig as TypeOrmModuleOptions,
    auth: {
        jwksUri: process.env.NOTIFICATOR_JWKSURI,
        audience: process.env.AUDIENCE,
        issuer: process.env.ISSUER,
    },
};
