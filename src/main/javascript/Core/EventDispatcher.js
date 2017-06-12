import { EventEmitter } from 'eventemitter3';

export class EventDispatcher extends EventEmitter
{
  emitAsync = (eventName, ...args) => {
    const executor = (resolve, reject) => {
      this.emit.apply(this, [eventName, resolve, reject].concat(args));
    };
    return new Promise(executor);
  };
}

export const RequestEventDispatcher = new EventDispatcher();
export const ResponseEventDispatcher = new EventDispatcher();

export const IncomingEventDispatcher = new EventDispatcher();
export const OutgoingEventDispatcher = new EventDispatcher();
export const InternalEventDispatcher = new EventDispatcher();

export const MessageBus = new EventDispatcher();