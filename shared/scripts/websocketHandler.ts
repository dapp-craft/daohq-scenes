export class WebSocketHandler {
  private events: { [key: string]: (event: MessageEvent) => void } = {}
  constructor() {}

  public addEvent(eventType: string, callback: (event: MessageEvent) => void) {
    this.events[eventType] = callback
  }

  fire(event: MessageEvent) {
    const wsMessage = JSON.parse(event.data)
    if (wsMessage && typeof wsMessage === 'object' && 'type' in wsMessage) {
      if (this.events[wsMessage.type]) {
        this.events[wsMessage.type](event)
      }
    }
  }
}
