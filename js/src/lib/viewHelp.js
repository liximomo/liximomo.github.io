/**
  *  browser view helper 
  * 
  */

export function isInView(element) {
  const docViewTop = window.scrollY;
  const docViewBottom = docViewTop + window.innerHeight;

  var elemTop = element.offsetTop;
  var elemBottom = elemTop + element.clientHeight;

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

export function getPosition(el, relateTo=document.body) {
  var xPos = 0;
  var yPos = 0;
  while (el !== relateTo ) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}