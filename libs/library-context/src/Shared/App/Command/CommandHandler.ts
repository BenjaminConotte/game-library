import { Command } from './Command';

export abstract class CommandHandler<C extends Command, R> {
  abstract handle(command: C): Promise<R>;
}
