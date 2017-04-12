import { on as postRobotOn } from 'post-robot/src';

class DeskproEventListener {
  on = (eventName) => {
    // TODO use a listener registry and have only one postRobot listener
    return cb => {
        postRobotOn(eventName, event => cb(event.data));
    };
  }
}

export default DeskproEventListener;
