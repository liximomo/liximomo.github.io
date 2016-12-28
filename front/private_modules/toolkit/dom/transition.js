const prefix = ['webkit', 'moz', 'ms', 'o'];

function capitalize(str) {
  return str.replace(str[0], str[0].toUpperCase());
};

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
