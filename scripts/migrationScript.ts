import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { ConfigService } from '../src/config/config.service';

const dbOptions = new ConfigService().getOrmConfig() as ConnectionOptions;

const migrate = async () => {
    const connection = await createConnection(dbOptions);
    connection.runMigrations();
};

migrate();
