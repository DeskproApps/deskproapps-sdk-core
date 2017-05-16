const parseDpParamsFromLocation = location => {

  const dpParams = {};

  const paramPrefix = 'dp.';
  const queryParams = location.search.substring(1).split('&').map(nameAndValue => nameAndValue.split('='));
  for (const param of queryParams) {
    const [name, value] = param;
    if (name.substr(0, paramPrefix.length) === paramPrefix) {
      dpParams[name] = value;
    }
  }

  return dpParams;
};

class WindowProxy {

  constructor() {
    this.state = {
      dpParams: parseDpParamsFromLocation(window.location)
    };
  }

  onLoad = (cb) => {
    if (window.document.readyState === 'complete') {
      cb();
      return;
    }

    window.onload = () => cb();
  };

  get xchild() {
    return window.xchild;
  }

  get dpParams() { return this.state.dpParams; }
}

export const windowProxy = new WindowProxy();
export default WindowProxy;

