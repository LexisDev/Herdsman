type EventHandler<T = unknown> = (payload: T) => void;

export class EventBus {
  private readonly listeners = new Map<string, EventHandler[]>();

  public on<T = unknown>(eventName: string, handler: EventHandler<T>): void {
    const handlers = this.listeners.get(eventName) ?? [];
    handlers.push(handler as EventHandler);
    this.listeners.set(eventName, handlers);
  }

  public emit<T = unknown>(eventName: string, payload?: T): void {
    const handlers = this.listeners.get(eventName) ?? [];

    for (const handler of handlers) {
      handler(payload);
    }
  }
}