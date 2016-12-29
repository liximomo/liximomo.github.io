export function createELement(string) {
  const wpEL = document.createElement('div');
  
  // remove line breaks from start and end of string
  // trim isn't reliable 
  wpEL.innerHTML = string.replace(/^\s+|\s+$/g, '');
  let el;
  if (wpEL.childNodes.length === 1) {
    el = wpEL.childNodes[0];
  } else {
    el = Array.prototype.slice.call(wpEL.childNodes);
  }
  wpEL.innerHTML = '';
  return el;
}

export function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string");
}
