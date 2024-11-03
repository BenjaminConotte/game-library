import { TransactionManager } from '@game-library/library-context/Shared/Domain';
import { DataSource, QueryRunner } from 'typeorm';

export class TypeORMTransactionManager implements TransactionManager {
  private _queryRunner: QueryRunner;

  constructor(private readonly _datasource: DataSource) {}

  async startTransaction(): Promise<void> {
    this._queryRunner = this._datasource.createQueryRunner();
    await this._queryRunner.connect();
    await this._queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this._queryRunner.commitTransaction();
    await this._queryRunner.release();
  }

  async rollbackTransaction(): Promise<void> {
    await this._queryRunner.rollbackTransaction();
    await this._queryRunner.release();
  }

  get queryRunner(): QueryRunner {
    return this._queryRunner;
  }
}
