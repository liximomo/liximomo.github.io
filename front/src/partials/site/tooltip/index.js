import 'tether';
import { createELement } from 'toolkit/dom/helper';
import { on, addDOMEvent } from 'toolkit/dom/event';
import { TRANS } from 'toolkit/dom/transition';

const TetherClass = {
  element : false,
  enabled : false
}

const ClassName = {
  FADE : 'fade',
};

const DEFAULT = {
  classPrefix: 'popover',
  template: '<div class="popover" role="popover">'
            + '<div class="popover-inner"></div></div>',
  renderTemplate: (pop, target) => {
    return pop.querySelector('.popover-inner').textContent = target.getAttribute('data-content');
  },
  attachment: 'bottom center',
  delay: 0,
  offset: '0 0',
  container: document.body,
};

const attachment = 'bottom center';

const tooltip = null;

class Popover {
  constructor(opt) {
    this.config = {
      ...DEFAULT,
      opt
    };
    this.container = this.config.container;
    this.content = this.config.content;
    
    this.pop = createELement(this.config.template);

    this.tether = new Tether({
      element: this.tooltip,
      target: opt.target,
      attachment: this.config.attachment,
      classes: TetherClass,
      classPrefix: this.config.classPrefix,
      offset: this.config.offset,
      constraints: this.config.constraints,
    });
  }

  show() {
    setContent(this.pop, this.content);
    this.tooltip.classList.add(ClassName.FADE);
    this.container.appendChild(this.tooltip);
  }

  hide() {
    this.tooltip.classList.add(ClassName.FADE);
  }

  dispose() {
    this.tether.destroy();
    this.container.removeChild(this.tooltip);
  }
}
