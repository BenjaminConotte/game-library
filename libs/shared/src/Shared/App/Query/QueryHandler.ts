import { Data } from './Data';
import { Query } from './Query';

export abstract class QueryHandler<
  QueryType extends Query,
  Result extends Data
> {
  public abstract query(query: QueryType): Promise<Result>;
}
