import { addDOMEvent } from 'toolkit/dom/event';

window.requestAnimFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

export default class SmoothHanle {
  constructor({
    eventName,
    hooks = [],
    updateContext = function() {},
    element,
  } = {}) {
    this.eventName = eventName;
    this.hooks = [].concat(hooks);
    this.nextContext = updateContext;
    this.context = {};
    this.ticking = false;
    this.element = element;
  }

  attachTo(element, eventName) {
    this.element = element;
    this.eventName = eventName;
    addDOMEvent(this.element, this.eventName, this.handle, false);
    return this;
  }

  updateContext(func) {
    this.nextContext = func;
    return this;
  }

  action(hook) {
    this.hooks = this.hooks.concat(hook);
    return this;
  }

  handle = (event) => {
    this.context = this.nextContext.call(this.element, event);
    this.requestTick();
  };

  requestTick() {
    if (!this.ticking) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  }

  update() {
    this.ticking = false;
    this.hooks.forEach(hook =>
      hook.call(this.element, this.context)
    );
  }
}
