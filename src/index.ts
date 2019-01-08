import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { throwError } from 'rxjs';

createConnection()
  .then(async connection => {
    Logger.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    user.email = 'apple';

    const errors = await validate(user);

    if (errors.length > 0) {
      throw errors;
    }

    await connection.manager.save(user);
    Logger.log('Saved a new user with id: ' + user.id);

    Logger.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    Logger.log(users, 'Loaded users: ');

    Logger.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch(error => Logger.log(error));