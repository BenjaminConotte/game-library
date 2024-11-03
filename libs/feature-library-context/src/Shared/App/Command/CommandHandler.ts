import { TransactionManager } from '../../Domain';
import { Command } from './Command';

export abstract class CommandHandler<C extends Command, R> {
  constructor(protected readonly _transactionManager: TransactionManager) {}

  abstract handle(command: C): Promise<R>;

  abstract setupTransaction(): Promise<void>;

  public async execute(command: C): Promise<void | R> {
    return this.setupTransaction()
      .then(async () => this.handle(command))
      .then(async (result: R) => {
        return this._transactionManager.commitTransaction().then(() => result);
      })
      .then(async (result: R) => result)
      .catch(async () => this._transactionManager.rollbackTransaction());
  }
}
