const transforms = ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform'];

let transform;
transforms.forEach(property => {
  if (document.body.style[property]) {
    transform = property;
  }
});

export function setTransform(element, value) {
  element.style[transform] = value;
}
