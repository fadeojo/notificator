import { Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { ConfigService } from './config/config.service';
import { User, UserRoles } from './user/user.entity';

const dbOptions = new ConfigService().getOrmConfig() as ConnectionOptions;

createConnection(dbOptions)
    .then(async connection => {
        Logger.log('Inserting a new user into the database...');
        const user = new User();
        user.role = UserRoles.Admin;
        user.authId = 'auth_12345';
        user.email = 'apple@apple.copm';

        const errors = await validate(user);

        if (errors.length > 0) {
            throw errors;
        }

        await connection.manager.save(user);
        Logger.log('Saved a new user with id: ' + user.id);

        Logger.log('Loading users from the database...');
        const users = await connection.manager.find(User);
        Logger.log(users, 'Loaded users: ');

        Logger.log(
            'Here you can setup and run express/koa/any other framework.',
        );
    })
    .catch(error => Logger.log(error));
