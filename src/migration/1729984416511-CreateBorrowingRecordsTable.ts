import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBorrowingRecordsTable1729984416511 implements MigrationInterface {
    name = 'CreateBorrowingRecordsTable1729984416511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`averageRating\` decimal(3,2) NOT NULL DEFAULT '-1.00', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`borrowing_records\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NULL, \`borrowDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`returnDate\` timestamp NULL, \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`borrowing_records\` ADD CONSTRAINT \`FK_ed0e6313bd529476854dcde98f1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`borrowing_records\` ADD CONSTRAINT \`FK_06a537e58b8331419a33a9392e7\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`borrowing_records\` DROP FOREIGN KEY \`FK_06a537e58b8331419a33a9392e7\``);
        await queryRunner.query(`ALTER TABLE \`borrowing_records\` DROP FOREIGN KEY \`FK_ed0e6313bd529476854dcde98f1\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`borrowing_records\``);
        await queryRunner.query(`DROP TABLE \`books\``);
    }

}
