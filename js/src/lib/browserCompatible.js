export function setTransform(element, value) { 
    element.style.transform = value;
    element.style.msTransform = value;
    element.style.webkitTransform = value;
    element.style.mozTransform = value;
    element.style.oTransform = value;
}