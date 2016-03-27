import ImmerseScroller from './lib/ImmerseScroller';
import { isInView } from './lib/viewHelp';


let immerseHeader = new ImmerseScroller(document.querySelector('#site-header'));
immerseHeader.init();