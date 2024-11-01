export interface TransactionManager {
  startTransaction(): void;
  commitTransaction(): void;
  rollbackTransaction(): void;
}
