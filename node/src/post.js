import Popover  from './lib/Popover';
import ImmerseScroller from './lib/ImmerseScroller';
import { getPosition } from './lib/viewHelp';

let pop = document.querySelector('#sharePopOver');
new Popover('#shareBtn', pop, 20); 
new Popover('#shareBtnOnBar', pop , 20, document.querySelector('.postActionsBar-container')); 
let actionFooter = document.querySelector('.postActionsFooter');
// let articleBegin = getPosition(document.querySelector('.main-post')).y;
let actionBegin = getPosition(actionFooter).y;
let immerseActionFooter = new ImmerseScroller({
  element: document.querySelector('.postActionsBar-content'),
  end: actionBegin - actionFooter.clientHeight,
  inClass: 'postActionsBar-content--affixed',
  upClass: 'is-inView',
  downClass: 'is-hidden'
});
immerseActionFooter.init();