import { TransactionManager } from '../../Domain';
import { Logger } from '../Utils';
import { Command } from './Command';

export abstract class CommandHandler<C extends Command, R> {
  constructor(
    protected readonly _transactionManager: TransactionManager,
    protected readonly _logger: Logger
  ) {}

  abstract handle(command: C): Promise<R>;

  abstract setupTransaction(): Promise<void>;

  public async execute(command: C): Promise<void | R> {
    this._logger.debug(`Executing command: ${command.constructor.name}`);
    return this.setupTransaction()
      .then(async () => this.handle(command))
      .then(async (result: R) => {
        return this._transactionManager.commitTransaction().then(() => result);
      })
      .then(async (result: R) => result)
      .catch(async (error) => {
        this._logger.error(error.message);
        this._transactionManager.rollbackTransaction();
        throw error;
      });
  }
}
