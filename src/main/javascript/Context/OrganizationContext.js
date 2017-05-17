import { Context } from '../Core/Context';

export class OrganizationContext extends Context
{
  static get TYPE() { return 'organization'; }
}

export const tryAndCreate = props => props.type === OrganizationContext.TYPE ? new OrganizationContext(props) : null;