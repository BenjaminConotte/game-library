import { Query } from '../../../../Shared/App/Query';

export class SearchGameQuery implements Query<string, unknown> {
  constructor(private readonly _partOfEAN: string) {}
  get target(): string {
    return this._partOfEAN;
  }
  get filter(): unknown {
    throw new Error('Method not implemented.');
  }
}
