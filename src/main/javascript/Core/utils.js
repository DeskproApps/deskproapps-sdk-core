const isBrowser = function() {
  return isNode() === false;
};

const isNode = function () {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
};

module.exports = { isBrowser, isNode };
