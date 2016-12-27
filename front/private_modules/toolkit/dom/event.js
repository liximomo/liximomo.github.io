export function addDOMEvent(html_element, event_name, event_function, useCapture) {
  if (html_element.addEventListener) {
    html_element.addEventListener(event_name, event_function, useCapture); //don't need the 'call' trick because in FF everything already works in the right way
    return;
  }

  //Internet Explorer
  html_element.attachEvent("on" + event_name, function() { event_function.call(html_element); });
}
