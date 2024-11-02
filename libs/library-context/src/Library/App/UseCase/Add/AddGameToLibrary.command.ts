import { Command } from '../../../../Shared/App/Command';

type AddGameToLibraryCommandBody = {
  ean: string;
  name: string;
  nameLanguage: string;
  type: string;
  isCoop: boolean;
};
export class AddGameToLibraryCommand
  implements Command<AddGameToLibraryCommandBody>
{
  constructor(private props: AddGameToLibraryCommandBody) {}

  get body(): AddGameToLibraryCommandBody {
    return this.props;
  }
}
