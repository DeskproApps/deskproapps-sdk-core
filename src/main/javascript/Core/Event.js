class Event
{
  constructor({ name }) {
    this.props = { name, enabled: true }
  }

  set enabled(flag) {
    this.props.enabled = flag;
  }

  get enabled() {
    return this.props.enabled;
  }
}

export default Event;