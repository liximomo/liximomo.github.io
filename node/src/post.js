import Popover  from './lib/Popover';
import ImmerseScroller from './lib/ImmerseScroller';
import { getPosition } from './lib/viewHelp';

// let pop = document.querySelector('#sharePopOver');
// // new Popover('#shareBtn', pop, 20); 
// // new Popover('#shareBtnOnBar', pop , 20, document.querySelector('.postActionsBar-container')); 
// let postFooter = document.querySelector('#postActionsFooter');
// // let articleBegin = getPosition(document.querySelector('.main-post')).y;
// let postFooterStartY = getPosition(postFooter).y;
// let postActionsBeingShowY = postFooterStartY - postFooter.clientHeight - window.innerHeight;

// let postActionsBar = document.querySelector('#postActionsBar');

let siteHeaderPH = document.querySelector('.foldHeader--placeholder');
let siteHeader = document.querySelector('#foldHeader');
let pageTitle = document.querySelector('#foldHeader .title');
const contentStartY = siteHeaderPH.clientHeight;
let immerseHeader = ImmerseScroller.createScroller();
immerseHeader.register({
  animate: (scrollY, offset) => {
    if (scrollY > 20) {
      pageTitle.classList.add('is-active');
    } else {
      pageTitle.classList.remove('is-active');
    }
  } 
});

//immerseHeader
immerseHeader.register({
  animate: (scrollY, offset) => {
    if (scrollY > contentStartY && offset > 0) {
      siteHeader.classList.add('is-hidden');
    } else {
      siteHeader.classList.remove('is-hidden');
    }
  } 
});

let comment = document.querySelector('#disqus_thread');
let commentOffsetY = getPosition(comment).y;
let scrollTrigger = commentOffsetY - window.innerHeight;
let isCommentLoad = false;
//load comment
immerseHeader.register({
  animate: (scrollY, offset) => {
    if (!isCommentLoad && scrollY > scrollTrigger) {
      console.log('loading comment');
      loadComment();
      isCommentLoad = true;
    } 
  } 
});

immerseHeader.init();
// let scroller = ImmerseScroller.createScroller();

// //immersePostActionsBar
// scroller.register({
//   animate: (scrollY, offset) => {
//     if (postActionsBeingShowY < scrollY || offset > 0) {
//       postActionsBar.classList.add('is-hidden');
//     } else {
//       postActionsBar.classList.remove('is-hidden');
//     }
//   } 
// });

// scroller.init();

function loadComment() {
  var d = document, s = d.createElement('script');

  s.src = '//l-x.disqus.com/embed.js';

  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}