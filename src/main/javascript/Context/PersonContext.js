import { Context } from '../Core/Context';

export class PersonContext extends Context
{
  static get TYPE() { return 'person'; }
}

export const tryAndCreate = props => props.type === PersonContext.TYPE ? new PersonContext(props) : null;