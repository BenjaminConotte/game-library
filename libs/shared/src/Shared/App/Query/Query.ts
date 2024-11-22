export interface Query<T = unknown, F = unknown> {
  get target(): T;
  get filter(): F | null;
}
