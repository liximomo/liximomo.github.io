import SmoothHanle from 'smooth-eventhandle';
import { getPosition } from 'toolkit/dom/measure';
import { linear } from 'toolkit/easing';
import { setStyle } from 'toolkit/dom/transition';
import Popover from 'popover';

new Popover('.post', 'tooltip', {
  selector: '[data-tooltip]',
  classPrefix: 'tooltip',
  template: '<div class="tooltip" role="tooltip">'
            + '<div class="tooltip-inner"></div></div>',
  renderTemplate: (pop, target) => {
    pop.querySelector('.tooltip-inner').textContent = target.getAttribute('data-tooltip');
  },
});

const siteHeader = document.querySelector('#siteHeader');
const headerBar = document.querySelector('#headerBar');
const pageBarTitle = document.querySelector('#barTitle');
const headerHeight = siteHeader.clientHeight;
const headerBarHeight = headerBar.clientHeight;
const initStyle = getComputedStyle(pageBarTitle);
const titleTop = parseInt(initStyle.top, 10);
const transitionDistance = titleTop - headerBarHeight + 14;

// comment state
const comment = document.querySelector('#disqus_thread');
const commentOffsetY = getPosition(comment).y;
const scrollTrigger = commentOffsetY - window.innerHeight;
let isCommentLoad = false;

let lastWindowY = 0;
const horizenHint = new SmoothHanle();
horizenHint
  .updateContext(function(event) {
    const context = {};
    const currentWindowY = window.scrollY;
    context.windowY = currentWindowY;
    context.offsetY = currentWindowY - lastWindowY;
    lastWindowY = currentWindowY;
    return context;
  })
  .action(({ windowY, offsetY }) => {
    if(windowY > transitionDistance) {
      setStyle(pageBarTitle, {
        transform: ''
      });
      pageBarTitle.classList.add('stay');
    } else {
      setStyle(pageBarTitle, {
        transform: `translate3D(0, -${windowY}px, 0)`
      });
      pageBarTitle.classList.remove('stay');
    }
  })
  .action(({ windowY, offsetY }) => {
    if (windowY < headerHeight ) {
      headerBar.classList.remove('is-hidden');
    } else {
      if (offsetY > 0) {
        headerBar.classList.add('is-hidden');
      } else {
        if (Math.abs(offsetY) >= 20) {
          headerBar.classList.remove('is-hidden');
        }
      }
    }
  })
  .action(({ windowY, offsetY }) => {
    if (!isCommentLoad && scrollY > scrollTrigger) {
      loadComment();
      isCommentLoad = true;
    }
  })
  .attachTo(window, 'scroll');

function loadComment() {
  var d = document, s = d.createElement('script');

  s.src = '//l-x.disqus.com/embed.js';

  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}
