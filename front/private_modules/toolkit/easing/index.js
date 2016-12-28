export function linear(current_time, start_value, end_value, total_time) {
  return (end_value - start_value) * (current_time /= total_time) + start_value;
};

export function easeInQuad(current_time, start_value, end_value, total_time) {
  return end_value * (current_time /= total_time) * current_time + start_value;
};

export function easeOutQuad(current_time, start_value, end_value, total_time) {
  return -end_value * (current_time /= total_time) * (current_time - 2) + start_value;
};

export function easeInOutQuad(current_time, start_value, end_value, total_time) {
  if ((current_time /= total_time / 2) < 1) return end_value / 2 * current_time * current_time + start_value;
  return -end_value / 2 * ((--current_time) * (current_time - 2) - 1) + start_value;
};

export function easeInCubic(current_time, start_value, end_value, total_time) {
  return end_value * (current_time /= total_time) * current_time * current_time + start_value;
};

export function easeOutCubic(current_time, start_value, end_value, total_time) {
  return end_value * ((current_time = current_time / total_time - 1) * current_time * current_time + 1) + start_value;
};

export function easeInOutCubic(current_time, start_value, end_value, total_time) {
  if ((current_time /= total_time / 2) < 1) return end_value / 2 * current_time * current_time * current_time + start_value;
  return end_value / 2 * ((current_time -= 2) * current_time * current_time + 2) + start_value;
};

export function easeInQuart(current_time, start_value, end_value, total_time) {
  return end_value * (current_time /= total_time) * current_time * current_time * current_time + start_value;
};

export function easeOutQuart(current_time, start_value, end_value, total_time) {
  return -end_value * ((current_time = current_time / total_time - 1) * current_time * current_time * current_time - 1) + start_value;
};

export function easeInOutQuart(current_time, start_value, end_value, total_time) {
  if ((current_time /= total_time / 2) < 1) return end_value / 2 * current_time * current_time * current_time * current_time + start_value;
  return -end_value / 2 * ((current_time -= 2) * current_time * current_time * current_time - 2) + start_value;
};

export function easeInQuint(current_time, start_value, end_value, total_time) {
  return end_value * (current_time /= total_time) * current_time * current_time * current_time * current_time + start_value;
};

export function easeOutQuint(current_time, start_value, end_value, total_time) {
  return end_value * ((current_time = current_time / total_time - 1) * current_time * current_time * current_time * current_time + 1) + start_value;
};

export function easeInOutQuint(current_time, start_value, end_value, total_time) {
  if ((current_time /= total_time / 2) < 1) return end_value / 2 * current_time * current_time * current_time * current_time * current_time + start_value;
  return end_value / 2 * ((current_time -= 2) * current_time * current_time * current_time * current_time + 2) + start_value;
};

export function easeInSine(current_time, start_value, end_value, total_time) {
  return -end_value * Math.cos(current_time / total_time * (Math.PI / 2)) + end_value + start_value;
};

export function easeOutSine(current_time, start_value, end_value, total_time) {
  return end_value * Math.sin(current_time / total_time * (Math.PI / 2)) + start_value;
};

export function easeInOutSine(current_time, start_value, end_value, total_time) {
  return -end_value / 2 * (Math.cos(Math.PI * current_time / total_time) - 1) + start_value;
};

function easeInExpo(current_time, start_value, end_value, total_time) {
  return (current_time == 0) ? start_value : end_value * Math.pow(2, 10 * (current_time / total_time - 1)) + start_value;
};

export function easeOutExpo(current_time, start_value, end_value, total_time) {
  return (current_time == total_time) ? start_value + end_value : end_value * (-Math.pow(2, -10 * current_time / total_time) + 1) + start_value;
};

export function easeInOutExpo(current_time, start_value, end_value, total_time) {
  if (current_time == 0) return start_value;
  if (current_time == total_time) return start_value + end_value;
  if ((current_time /= total_time / 2) < 1) return end_value / 2 * Math.pow(2, 10 * (current_time - 1)) + start_value;
  return end_value / 2 * (-Math.pow(2, -10 * --current_time) + 2) + start_value;
};

export function easeInCirc(current_time, start_value, end_value, total_time) {
  return -end_value * (Math.sqrt(1 - (current_time /= total_time) * current_time) - 1) + start_value;
};

export function easeOutCirc(current_time, start_value, end_value, total_time) {
  return end_value * Math.sqrt(1 - (current_time = current_time / total_time - 1) * current_time) + start_value;
};

export function easeInOutCirc(current_time, start_value, end_value, total_time) {
  if ((current_time /= total_time / 2) < 1) return -end_value / 2 * (Math.sqrt(1 - current_time * current_time) - 1) + start_value;
  return end_value / 2 * (Math.sqrt(1 - (current_time -= 2) * current_time) + 1) + start_value;
};

export function easeInElastic(current_time, start_value, end_value, total_time) {
  var s = 1.70158;
  var p = 0;
  var a = end_value;
  if (current_time == 0) return start_value;
  if ((current_time /= total_time) == 1) return start_value + end_value;
  if (!p) p = total_time * .3;
  if (a < Math.abs(end_value)) {
    a = end_value;
    var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(end_value / a);
  return -(a * Math.pow(2, 10 * (current_time -= 1)) * Math.sin((current_time * total_time - s) * (2 * Math.PI) / p)) + start_value;
};

export function easeOutElastic(current_time, start_value, end_value, total_time) {
  var s = 1.70158;
  var p = 0;
  var a = end_value;
  if (current_time == 0) return start_value;
  if ((current_time /= total_time) == 1) return start_value + end_value;
  if (!p) p = total_time * .3;
  if (a < Math.abs(end_value)) {
    a = end_value;
    var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(end_value / a);
  return a * Math.pow(2, -10 * current_time) * Math.sin((current_time * total_time - s) * (2 * Math.PI) / p) + end_value + start_value;
};

export function easeInOutElastic(current_time, start_value, end_value, total_time) {
  var s = 1.70158;
  var p = 0;
  var a = end_value;
  if (current_time == 0) return start_value;
  if ((current_time /= total_time / 2) == 2) return start_value + end_value;
  if (!p) p = total_time * (.3 * 1.5);
  if (a < Math.abs(end_value)) {
    a = end_value;
    var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(end_value / a);
  if (current_time < 1) return -.5 * (a * Math.pow(2, 10 * (current_time -= 1)) * Math.sin((current_time * total_time - s) * (2 * Math.PI) / p)) + start_value;
  return a * Math.pow(2, -10 * (current_time -= 1)) * Math.sin((current_time * total_time - s) * (2 * Math.PI) / p) * .5 + end_value + start_value;
};

export function easeInBack(current_time, start_value, end_value, total_time, s) {
  if (s == undefined) s = 1.70158;
  return end_value * (current_time /= total_time) * current_time * ((s + 1) * current_time - s) + start_value;
};

export function easeOutBack(current_time, start_value, end_value, total_time, s) {
  if (s == undefined) s = 1.70158;
  return end_value * ((current_time = current_time / total_time - 1) * current_time * ((s + 1) * current_time + s) + 1) + start_value;
};

export function easeInOutBack(current_time, start_value, end_value, total_time, s) {
  if (s == undefined) s = 1.70158;
  if ((current_time /= total_time / 2) < 1) return end_value / 2 * (current_time * current_time * (((s *= (1.525)) + 1) * current_time - s)) + start_value;
  return end_value / 2 * ((current_time -= 2) * current_time * (((s *= (1.525)) + 1) * current_time + s) + 2) + start_value;
};

export function easeInBounce(current_time, start_value, end_value, total_time) {
  return end_value - jQuery.easing.easeOutBounce(x, total_time - current_time, 0, end_value, total_time) + start_value;
};

export function easeOutBounce(current_time, start_value, end_value, total_time) {
  if ((current_time /= total_time) < (1 / 2.75)) {
    return end_value * (7.5625 * current_time * current_time) + start_value;
  } else if (current_time < (2 / 2.75)) {
    return end_value * (7.5625 * (current_time -= (1.5 / 2.75)) * current_time + .75) + start_value;
  } else if (current_time < (2.5 / 2.75)) {
    return end_value * (7.5625 * (current_time -= (2.25 / 2.75)) * current_time + .9375) + start_value;
  } else {
    return end_value * (7.5625 * (current_time -= (2.625 / 2.75)) * current_time + .984375) + start_value;
  }
};

export function easeInOutBounce(current_time, start_value, end_value, total_time) {
  if (current_time < total_time / 2) return jQuery.easing.easeInBounce(x, current_time * 2, 0, end_value, total_time) * .5 + start_value;
  return jQuery.easing.easeOutBounce(x, current_time * 2 - total_time, 0, end_value, total_time) * .5 + end_value * .5 + start_value;
};

export function swing(current_time, start_value, end_value, total_time) {
  //alert(jQuery.easing.default);
  return easeInQuad(current_time, start_value, end_value, total_time);
};

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
