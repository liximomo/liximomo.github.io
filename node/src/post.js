import Popover  from './lib/Popover';
import ImmerseScroller from './lib/ImmerseScroller';
import { getPosition } from './lib/viewHelp';

let pop = document.querySelector('#sharePopOver');
new Popover('#shareBtn', pop, 20); 
new Popover('#shareBtnOnBar', pop , 20, document.querySelector('.postActionsBar-container')); 
let postFooter = document.querySelector('#postActionsFooter');
// let articleBegin = getPosition(document.querySelector('.main-post')).y;
let postFooterStartY = getPosition(postFooter).y;
let postActionsBeingShowY = postFooterStartY - postFooter.clientHeight - window.innerHeight;

let postActionsBar = document.querySelector('#postActionsBar');


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