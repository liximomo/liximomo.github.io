import SmoothHanle from 'smooth-eventhandle';
import { getPosition } from 'toolkit/dom/measure';

let siteHeader = document.querySelector('#siteHeader');
let headerBar = document.querySelector('#headerBar');
let pageBarTitle = document.querySelector('#barTitle');
let pageTitle = document.querySelector('#hugeTitle');
const contentStartY = siteHeader.clientHeight;

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
    if (windowY > 0) {
      headerBar.classList.add('is-active');
      pageBarTitle.classList.add('is-active');
      pageTitle.classList.add('is-active');
    } else {
      headerBar.classList.remove('is-active');
      pageBarTitle.classList.remove('is-active');
      pageTitle.classList.remove('is-active');
    }

    if (windowY < contentStartY ) {
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
