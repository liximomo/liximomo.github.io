import ImmerseScroller from './lib/ImmerseScroller';

let siteHeaderPH = document.querySelector('.siteHeader--placeholder');
let siteHeader = document.querySelector('#siteHeader');
let pageTitle = document.querySelector('#pageTitle');
const contentStartY = siteHeaderPH.clientHeight;
let immerseHeader = ImmerseScroller.createScroller();
immerseHeader.register({
  animate: (scrollY, offset) => {
    if (scrollY > 0 ) {
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

immerseHeader.init();