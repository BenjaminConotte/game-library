import { Entity } from './Entity';

export abstract class Aggregate<EntityId, T> extends Entity<EntityId, T> {}
