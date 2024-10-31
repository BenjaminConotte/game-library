export interface Command<T> {
  get body(): T;
}
