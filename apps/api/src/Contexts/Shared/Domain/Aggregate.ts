import { Entity } from './Entity';

export abstract class Aggregate<EntityId = unknown, T = unknown> extends Entity<
  EntityId,
  T
> {}
