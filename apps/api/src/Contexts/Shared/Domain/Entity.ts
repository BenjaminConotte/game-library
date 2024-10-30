export abstract class Entity<EntityId, T> {
  protected _id: EntityId;
  protected set id(id: EntityId) {
    this._id = id;
  }
  get id(): EntityId {
    return this._id;
  }
  abstract toPrimitives(): T;
}
