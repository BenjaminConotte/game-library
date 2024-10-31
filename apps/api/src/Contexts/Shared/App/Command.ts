export interface Command<T = unknown> {
  get body(): T;
}
