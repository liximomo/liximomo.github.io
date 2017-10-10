---
title:  "Travel-To-This"
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