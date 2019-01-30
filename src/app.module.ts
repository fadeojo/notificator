import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConfig } from './config';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';

const appConfig = new ConfigService();

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: appConfig.getAuthConfig().jwksUri,
    }),

    // Validate the audience and the issuer.
    audience: appConfig.getAuthConfig().audience,
    issuer: appConfig.getAuthConfig().issuer,
    algorithms: ['RS256'],
});

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    constructor(private readonly connection: Connection) {}

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(checkJwt).forRoutes('user');
    }
}
