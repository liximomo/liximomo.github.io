import { getPosition } from './viewHelp';

export default class Popover {
  constructor(toggle, popover, direction = 'top') {
    this.toggle = document.querySelector(toggle);
    this.popover = document.querySelector(popover);
    this.direction = direction;
    this.isShow = false;

    this.popover.remove();
    this.popover.style.position = 'absolute';
    this.popover.style.display = 'block';
    this.toggle.addEventListener('click', this.handleToggle.bind(this), false);
  }

  show() {
    const pos = getPosition(this.toggle);
    const rect = this.toggle.getBoundingClientRect();
    pos.height = rect.height;
    pos.width = rect.width;

    this.popover.style.visibility = 'hidden';
    document.body.appendChild(this.popover);
    

    const actualWidth = this.popover.clientWidth;
    const actualHeight = this.popover.clientHeight + 20;

    let tp = null;
    switch (this.direction) {
      case 'bottom':
        tp = { top: pos.y + pos.height, left: pos.x + pos.width / 2 - actualWidth / 2 }
        break
      case 'top':
        tp = { top: pos.y - actualHeight, left: pos.x + pos.width / 2 - actualWidth / 2 }
        break
      case 'left':
        tp = { top: pos.y + pos.height / 2 - actualHeight / 2, left: pos.x - actualWidth }
        break
      case 'right':
        tp = { top: pos.y + pos.height / 2 - actualHeight / 2, left: pos.x + pos.width }
        break
    }

    this.popover.style.top = `${tp.top}px`;
    this.popover.style.left = `${tp.left}px`;
    this.popover.style.visibility = 'visible';
    return;
  }

  handleToggle() {
    if (this.isShow) {
      this.popover.remove();
    } else {
      this.show();
    }
    this.isShow = !this.isShow;
  }
}
