import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseBackupService } from './db-backup.service';

describe('DatabaseBackupService', () => {
  let service: DatabaseBackupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseBackupService],
    }).compile();

    service = module.get<DatabaseBackupService>(DatabaseBackupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
