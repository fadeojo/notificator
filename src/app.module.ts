import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
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
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => config.getOrmConfig(),
            inject: [ConfigService],
        }),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            debug: true,
            playground: true,
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    constructor(private readonly connection: Connection) {}

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(checkJwt).forRoutes('user');
    }
}
