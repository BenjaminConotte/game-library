export const ITransactionManager = Symbol('ITransactionManager');

export interface TransactionManager {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): void;
}
