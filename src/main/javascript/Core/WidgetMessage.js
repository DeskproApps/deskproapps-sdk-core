export class WidgetMessage
{
  /**
   * @param {*} body
   * @param {String} id
   */
  constructor({ body, id, status })
  {
    this.props = { body, id, status };
  }

  get id() { return this.props.id };

  get status() { return this.props.status };

  get rawBody() { return this.props.body };

  get body() { return JSON.parse(this.props.body); }; //not good it's dynamic
}
