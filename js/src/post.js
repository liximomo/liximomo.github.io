import Popover  from './lib/Popover';
import ImmerseScroller from './lib/ImmerseScroller';
import { getPosition } from './lib/viewHelp';

new Popover('#shareBtn', '#sharePopOver'); 

let actionFooter = document.querySelector('.postActionsFooter');
let articleBegin = getPosition(document.querySelector('.main-post')).y;
let actionBegin = getPosition(actionFooter).y;
let immerseActionFooter = new ImmerseScroller(document.querySelector('.postActionsFooter--affixed'), articleBegin, actionBegin);
immerseActionFooter.init();