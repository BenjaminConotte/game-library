import { Query } from '@game-library/shared/Shared/App/Query';

export class SearchGameQuery
  implements Query<{ partOfEAN?: string; partOfName?: string }, unknown>
{
  constructor(
    private readonly _partOfEAN: string = null,
    private readonly _partOfName: string = null
  ) {}
  get target(): { partOfEAN?: string; partOfName?: string } {
    return { partOfEAN: this._partOfEAN, partOfName: this._partOfName };
  }
  get filter(): unknown {
    throw new Error('Method not implemented.');
  }
}
