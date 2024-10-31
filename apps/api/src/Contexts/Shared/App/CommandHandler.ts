import { Command } from './Command';

export abstract class CommandHandler<C extends Command> {
  abstract handle(command: C): Promise<void>;
}
