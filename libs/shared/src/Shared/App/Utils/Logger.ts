export const ILogger = Symbol('ILogger');

export interface Logger {
  log(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}
