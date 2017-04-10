import OneOffListener from './OneOffListener';

/**
 *
 * @param {String} key
 * @param {Map} map
 * @return {Array}
 */
function getOneOrCreate(key, map) {
  let list;
  if (map.has(key)) {
    list = map.get(key);
  } else {
    list = [];
    map.set(key, list);
  }

  return list;
}

class ListenerRegistry {
  constructor() {
    this.listenerMap = new Map();
  }

  /**
   * @param {String} eventName
   * @param {Function} listener
   *
   * @return {Function}
   */
  add = (eventName, listener) => {
    const listeners = getOneOrCreate(eventName, this.listenerMap);
    listeners.push(listener);

    return listener;
  };

  remove = (listener) => {
    for (const listenerList of this.listenerMap.values()) {
      const indexOf = listenerList.indexOf(listener);
      if (indexOf !== -1) {
        listenerList.splice(indexOf, 1);
      }
    }
  };

  /**
   * @param {String} eventName
   * @param {Function} listener
   * @return {OneOffListener}
   */
  addOneOff = (eventName, listener) => {
    const oneOff = new OneOffListener(listener);

    const listeners = getOneOrCreate(eventName, this.listenerMap);
    listeners.push(oneOff);

    return oneOff;
  };

  /**
   * @param eventName
   * @returns {Array<Function>}
   */
  findAllByEvent = (eventName) => {
    if (this.listenerMap.has(eventName)) {
      return this.listenerMap.get(eventName);
    }

    return [];
  };
}

export default ListenerRegistry;
