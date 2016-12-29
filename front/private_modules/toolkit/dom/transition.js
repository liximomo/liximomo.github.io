const prefix = ['webkit', 'moz', 'ms', 'o'];

function capitalize(str) {
  return str.replace(str[0], str[0].toUpperCase());
};

function sniffTransition(el) {
  let ret     = {}
  const trans = ['transition', 'webkitTransition', 'mozTransition', 'OTransition']
  const tform = ['transform', 'webkitTransform', 'mozTransform', 'OTransform']
  const end   = {
    'transition'       : 'transitionend',
    'mozTransition'    : 'transitionend',
    'webkitTransition' : 'webkitTransitionEnd',
    'OTransition'      : 'oTransitionEnd',
  }

  trans.some(prop => {
    if (el.style[prop] !== undefined) {
      ret.transitionProp = prop
      ret.transEndEvent = end[prop]
      return true
    }
  })

  tform.some(prop => {
    if (el.style[prop] !== undefined) {
      ret.transformProp = prop
      ret.transformCssProp = prop.replace(/(.*)Transform/, '-$1-transform')
      return true
    }
  })

  return ret
}

let el = document.createElement('div')
const TRANS = sniffTransition(el);
el = null;

export function setStyle(el, styles, remember) {
  const s = el.style;
  const original = {};

  for (let prop in styles) {
    if (remember) original[prop] = s[prop] || '';
    prefix.forEach(prex =>
      s[`${prex}${capitalize(prop)}`] = styles[prop]
    );
    s[prop] = styles[prop];
  }

  return original;
};

export {
  TRANS,
}
