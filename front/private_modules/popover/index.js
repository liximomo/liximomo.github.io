import Tether from 'tether';
import { createELement } from 'toolkit/dom/helper';
import { on, addDOMEvent } from 'toolkit/dom/event';
import { TRANS } from 'toolkit/dom/transition';

const TetherClass = {
  element: false,
  enabled: false,
  abutted: false,
}

const ClassName = {
  FADE : 'fade',
};

const MIRROR_ATTACH = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  middle: 'middle',
  center: 'center'
};

const DEFAULT = {
  triggers: ['hover', 'click'], // click or hover
  selector: null,
  classPrefix: 'popover',
  template: '<div class="popover" role="popover">'
            + '<div class="popover-inner"></div></div>',
  renderTemplate: (pop, target) => {
    pop.querySelector('.popover-inner').textContent = target.getAttribute('data-content');
  },
  attachment: 'top center',
  delay: 0,
  duration: 0.2,
  offset: '0 0',
  container: document.body,
};

class Context {
  constructor(target, opt) {
    this.ishover = false; // is hover triggered

    this.config = opt;
    this.container = this.config.container;
    this.target = target;

    this.pop = createELement(this.config.template);
    this.pop.style.opacity = 0;
    this.pop.style[TRANS.transitionProp] = `opacity ${this.config.duration}s cubic-bezier(0.4, 0, 0, 1)`;
    this.config.renderTemplate(this.pop, this.target);

    let dropAttach = this.config.attachment.split(' ');
    dropAttach[0] = MIRROR_ATTACH[dropAttach[0]];
    dropAttach = dropAttach.join(' ');
    this.dropAttach = dropAttach;

    this.complete = () => {
      if (this.isShow) {
        // do nothing
      } else {
        this.container.removeChild(this.pop);
      }
    };

    this.pop.addEventListener(TRANS.transEndEvent, this.complete);
  }

  show(event) {
    if(this.isShow) return;

    this.isShow = true;

    if (event.name === 'hover') {
      this.ishover = true;
    } else if (event.name === 'click') {
      if (this.ishover) return;
    }

    this.container.appendChild(this.pop);

    this.tether = new Tether({
      element: this.pop,
      target: this.target,
      attachment: this.dropAttach,
      targetAttachment: this.config.attachment,
      classes: TetherClass,
      classPrefix: this.config.classPrefix,
      offset: this.config.offset,
      constraints: this.config.constraints,
    });

    this.tether.position();

    setTimeout(() => {
      this.pop.style.opacity = 0.9;
    }, this.config.delay);

  }

  hide(event) {
    if(!this.isShow) return;

    this.isShow = false;
    
    if (event.name === 'hover') {
      this.ishover = false;
    } else if (event.name === 'click') {
      // do nothing
    }

    this.tether.destroy();
    this.pop.style.opacity = 0;
  }
}

export default class Popover {
  constructor(element, selector, opt) {
    if (typeof element === 'string') {
      this.elements = document.querySelectorAll(element);
    } else {
      this.elements = [].concat(element);
    }
    this.config = {
      ...DEFAULT,
      ...opt
    };
    this.elements.forEach(this._setListeners.bind(this));
  }

  _toggle(element, event) {
    const context = this._getElementContext(element);
    if (context.isShow) {
      this._enter(element, event);
    } else {
      this._leave(element, event);
    }
  }

  _enter(element, event) {
    const context = this._getElementContext(element);
    context.show(event);
  }

  _leave(element, event) {
    const context = this._getElementContext(element);
    context.hide(event);
  }

  _getElementContext(element) {
    if (!element._popContext) {
      element._popContext = new Context(element, this.config);
    }
    return element._popContext;
  }

  _setListeners(element) {
    const self = this;
    this.config.triggers.forEach((trigger) => {
      if (trigger === 'click') {
        this._setListener(element, trigger, function() {
          self._toggle(this, {
            name: 'click'
          });
        });
      } else if (trigger === 'hover') {
        const eventIn = 'mouseover';
        const eventOut = 'mouseout';
        this._setListener(element, eventIn, function() {
          self._enter(this, {
            name: 'hover'
          });
        });
        this._setListener(element, eventOut, function() {
          self._leave(this, {
            name: 'hover'
          });
        });
      }
    });
  }

  _setListener(el, event, handle) {
    if (this.config.selector) {
      on(el, event, this.config.selector, handle);
    } else {
      addDOMEvent(el, event, handle);
    }
  }
}
