import { TransactionManager } from './TransactionManager';

export interface BaseRepository {
  defineTransaction(transactionManager: TransactionManager): Promise<void>;
}
