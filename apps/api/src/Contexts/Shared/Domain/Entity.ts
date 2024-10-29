export abstract class Entity<EntityId, Structure> {
  abstract get id(): EntityId;
  abstract toPrimitives(): Structure;
}
