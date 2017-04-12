class WindowProxy {
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
}

export const windowProxy = new WindowProxy();
export default WindowProxy;

