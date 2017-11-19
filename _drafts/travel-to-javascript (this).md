---
title:  "Travel-to-Javascript (this)"
date:   2017-10-10 15:18:42 +0800
tags:  javascript this
layout: post
excerpt: >
  How this works in javascript.
---

## javascript 前生

在 javascript 设计之初, 规定每一个函数的第一个参数都必须是一个特殊值 `this`。 所以当我们声明函数时，必须使用如下的写法：

```javascript
funciton foo(this, msg) {
  console.log(msg);
}

foo(null, 'hello world!')
```

`this` 是个特殊的参数，我们想要特别强调这点，所以，我们打算为 `this` 增加点限制，不允许用户像正常参数那样手动传参：

```javascript
foo('this', 'hello world!') // throw error 
```

OK! 在造一些特殊方法用来传 `this` 参数。

```javascript
Function.prototype.bind = function (func, thisArg, ...restArgsArray) {
  return function(...args) {
    func(thisArg, ...[restArgsArray].concat(args));
  };
};

Function.prototype.apply = function (func, thisArg, restArgsArray) {
  return func(thisArg, ...restParamsArray);
};

Function.prototype.call = function (func, thisArg, restArgsArray) {
  return func(thisArg, ...restParamsArray);
};
```