import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { developmentConfig } from './development';
import { productionConfig } from './production';
import { testConfig } from './test';

export interface AppConfig {
    orm: TypeOrmModuleOptions;
    auth: {
        jwksUri: string;
        audience: string;
        issuer: string;
    };
}
@Injectable()
export class ConfigService {
    private readonly envConfig: AppConfig;

    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.envConfig = productionConfig;
        } else if (process.env.NODE_ENV === 'test') {
            this.envConfig = testConfig;
        } else {
            this.envConfig = developmentConfig;
        }
    }

    getOrmConfig(): AppConfig['orm'] {
        return this.envConfig.orm;
    }
    getAuthConfig(): AppConfig['auth'] {
        return this.envConfig.auth;
    }
}
