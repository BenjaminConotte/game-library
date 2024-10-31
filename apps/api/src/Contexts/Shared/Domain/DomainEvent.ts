export interface DomainEvent {
  get body(): { [k: string]: string | number | boolean };
}
