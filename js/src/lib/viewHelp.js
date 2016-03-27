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
