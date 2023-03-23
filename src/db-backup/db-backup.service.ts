import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseBackupService {
    private readonly logger = new Logger(DatabaseBackupService.name);

    @Cron('0 0 * * *')
    handleCron() {
        this.logger.debug('Sauvegarde de la base de données effectuée chaque jour à minuit');
        this.DatabaseBackup();
    }

    private DatabaseBackup() {
        const host = process.env.MYSQL_HOST;
        const database = process.env.MYSQL_DATABASE;
        const user = process.env.MYSQL_USER;
        const password = process.env.MYSQL_PASSWORD;

        const date = new Date().toISOString().replace(/[:.]/g, "-").split('.')[0];
        const filename = `dump-${date}.sql`;
        const filePath = path.join('sql-dumps', filename);

        if (!fs.existsSync('sql-dumps')) {
            fs.mkdirSync('sql-dumps');
        }

        child_process.exec(
            `mysqldump -h ${host} -u ${user} -p${password} ${database} > ${filePath}`,
            error => {
                if (error) {
                    this.logger.error(`Erreur lors de la sauvegarde de la base de données: ${error.message}`);
                } else {
                    this.logger.log(`Sauvegarde de la base de données réussie: ${filePath}`);
                }
            }
        );
    }
}