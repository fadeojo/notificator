import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class UserMigration1546908148138 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'authId',
                        type: 'varchar',
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            'user',
            new TableIndex({
                name: 'IDX_USER_EMAIL',
                columnNames: ['email'],
            }),
        );
        await queryRunner.createIndex(
            'user',
            new TableIndex({
                name: 'IDX_AUTH_ID',
                columnNames: ['authId'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex('question', 'IDX_USER_EMAIL');
        await queryRunner.dropIndex('question', 'IDX_AUTH_ID');
        await queryRunner.dropTable('question');
    }
}
