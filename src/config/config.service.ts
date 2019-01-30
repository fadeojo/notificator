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

export class ConfigService {
    private readonly envConfig: AppConfig;

    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.envConfig = productionConfig;
        } else if (process.env.NODE_ENV === 'development') {
            this.envConfig = developmentConfig;
        } else {
            this.envConfig = testConfig;
        }
    }

    getOrmConfig(): AppConfig['orm'] {
        return this.envConfig.orm;
    }
    getAuthConfig(): AppConfig['auth'] {
        return this.envConfig.auth;
    }
}
