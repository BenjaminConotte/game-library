import { TransactionManager } from '../Port';
import { Command } from './Command';

export abstract class CommandHandler<C extends Command, R> {
  constructor(private readonly _transactionManager: TransactionManager) {}

  abstract handle(command: C): Promise<R>;

  public async execute(command: C): Promise<void | R> {
    return this._transactionManager
      .startTransaction()
      .then(async () => this.handle(command))
      .then(async (result: R) => {
        return this._transactionManager.commitTransaction().then(() => result);
      })
      .then(async (result: R) => result)
      .catch(async () => this._transactionManager.rollbackTransaction());
  }
}
