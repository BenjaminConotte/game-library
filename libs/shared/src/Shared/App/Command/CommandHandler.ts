import { TransactionManager } from '../../Domain';
import { Logger } from '../Utils';
import { Command } from './Command';
import { Result } from './Result';

export abstract class CommandHandler<C extends Command> {
  constructor(
    protected readonly _transactionManager: TransactionManager,
    protected readonly _logger: Logger
  ) {}

  abstract handle(command: C): Promise<Result>;

  abstract setupTransaction(): Promise<void>;

  public async execute(command: C): Promise<Result> {
    this._logger.debug(`Executing command: ${command.constructor.name}`);
    try {
      await this.setupTransaction();
      const result = await this.handle(command);
      await this._transactionManager.commitTransaction();
      return result;
    } catch (error) {
      this._logger.error(error.message);
      await this._transactionManager.rollbackTransaction();
      throw error;
    }
  }
}
