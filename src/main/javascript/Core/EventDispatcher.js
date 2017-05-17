import { EventEmitter } from 'eventemitter3';

export class EventDispatcher extends EventEmitter
{
  emitAsync = (eventName, ...args) => {
    const executor = (resolve, reject) => {
      console.log('will emit eventName ', eventName);
      this.emit.apply(this, [eventName, resolve, reject].concat(args));
    };
    return new Promise(executor);
  };
}

export const RequestEventDispatcher = new EventDispatcher();
export const ResponseEventDispatcher = new EventDispatcher();