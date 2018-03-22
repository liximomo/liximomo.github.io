---
title:  "JavaScript 闭包"
date:   2017-08-02 +0800
tags:  JavaScript closure
layout: post
excerpt: >
  函数在 JavaScript 中被作为 first-class citizens 对待，这通常是函数式编程语言的基础。闭包作为在函数式编程语言中经常使用的技术，也成为了 JavaScript 中不可或缺的强大工具。闭包因何而存在？在 JavaScript 中闭包又是如何实现的？
---

## 引言
这篇文章会以追根溯源的方式讲解释闭包的概念，弄清楚闭包因何而存在，在 JavaScript 中闭包又是如何实现的。

## 概念

### Free variable（自由变量）
我们先来解释一下什么是 free variable:

> **Free variable:** 一个变量，既不是函数参数，也不是函数的本地变量，则称为 free variable。

示例1：

```javascript
let x = 10;
 
function foo() {
  console.log(x);
}
```

对 `foo` 函数来说，变量 x 就是一个 free variable。拥有了 free variable 的函数会面临一个问题——如何解析此类变量。

```javascript
let x = 10;
 
function foo() {
  console.log(x);
}
 
function bar() {
  let x = 20;
  foo(); // 10, 而不是 20!
}

bar();
```

上述代码中，`foo` 函数中的 `x` 变量是解析到 10 还是 20？要回答这个问题，我们要弄清楚几个和函数相关的环境。

### 环境
一个函数的环境分为**调用时环境**和**创建时环境**。调用时环境是动态的，随着程序的运行有着不确定性，创建时环境是静态的，我们可以通过观察代码就确定环境的范围。示例1中的环境可以用伪代码描述为：

```javascript
globalEnvironment = {
  x: 10
};

fooCreateEnvironment = globalEnvironment;

barCreateEnvironment = globalEnvironment;

fooCallEnvironment = {
  x: 20
};
```

我们依赖函数的定义本身是无法确定 free variable 的值如何解析，要解决这个问题，我们可以将环境和函数关联起来，利用与函数相关联的环境中去查找解析变量。这样做会引出一个新的问题，是选择调用时环境还是创建时环境来关联函数呢？在 JavaScript 中是**创建时环境**，这主要是因为 JavaScript 采用了 **static scope（静态范围）**。

> **Static scope:** 如果可以仅凭查看源代码就可以决定解析一个变量所使用的环境，就说这个语言实现了静态范围。

Static scope 有时也被称为 lexical scope（词法范围）。

技术上来说，static scope 是通过捕捉函数创建时的环境来实现的。

## 闭包
当我们将函数和函数创建时的环境关联起来，就形成了 free variable 的一种解决方案。我们把此称为闭包：

```
函数 + 函数创建时的环境 = 闭包
```

通常人们对闭包的理解是不完全的，认为在 JavaScript 中只有嵌入的函数才是闭包。但其实任何拥有 free variable（自由变量）的函数都是以闭包的形式存在的。因为本质上，闭包是 free variable 问题的一种解决方案。

我们来看看 JavaScript 中典型的闭包，示例2：

```javascript
function foo() {
  let x = 10;
   
  // 闭包，保存 foo 的环境
  function bar() {
    return x;
  }
 
  // 将 bar 作为返回值返回
  return bar;
}
 
let x = 20;
 
// 调用 `foo` 得到 `bar` 函数.
let bar = foo();
 
// 调用 bar 函数
bar(); // 10, not 20!
```

技术上来将，示例2中的 `bar` 函数和示例1的 `foo` 函数并没有区别，都是保存了函数创建时所处的环境。

值得一提的是，同一个环境可以被多个闭包共享。这使我们可以访问和修改共享范围内的数据，示例3：

```javascript
function createCounter() {
  let count = 0;
 
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
  };
}
 
let counter = createCounter();

console.log(
  counter.increment(), // 1
  counter.decrement(), // 0
  counter.increment(), // 1
);
```

示例3中的两个闭包（increment 和 decrement）都创建于一个包含 count 变量的代码块（范围）内，它们共享着父环境的引用。用伪代码描述为：

```javascript
counterEnvironment = {
  count: 0
};

// 闭包
incrementClouse = {
  function: increment,  // 函数
  environment: counterEnvironment, // 环境
};

decrementClouse = {
  function: decrement,
  environment: counterEnvironment,
}
```

## 使用场景
闭包一个非常有用的特性就是它允许你将一些数据（环境）与一个可以操作这些数据的函数关联起来。这很容易和面向对象编程联系起来，在面向对象编程中，对象允许我们将数据（对象的属性）和方法（函数）关联起来。

### 函数工厂
汽车工厂生产的是汽车，函数工厂生产的是函数，在 JavaScript 中一个函数工厂就是创造函数的函数。

在一个项目中，我们经常需要使用各种函数来将一个参数和固定的数字相加，我们可以把每一个函数都声明出来：

```javascript
function add3(value) {
  return 3 + value;
}

function add5(value) {
  return 3 + value;
}

function add7(value) {
  return 3 + value;
}
```

如果这样的函数有很多，将它们都一一定义出来是很不现实的，借助函数工厂，我们可以这样做：

```javascript
function createAdder(augend) {
  return function adder(addend) {
    return augend + addend;
  };
}

const add3 = createAdder(3);
const add5 = createAdder(5);
const add7 = createAdder(7);
```

借助函数工厂，可以很大程度的精简我们的代码。

### 封装私有变量和方法
JavaScript 本身是没有原生的方式来定义私有变量和方法，但是我们可以通过闭包来模仿这种行为。私有变量和方法的好处不止在于可以限制可访问的代码，同时提供一种有效的方式来管理全局命名空间，防止非核心的变量和方法污染公共接口。

```javascript
function makePeople() {
  let privateName;

  function setName(name) {
    privateName = name;
  }

  return {
    changeName: function (name) {
      setName(name);
    },
    greeting: function() {
      return 'Hi! I am ' + privateName + '.';
    },
  };   
}

const people = makePeople();

people.changeName('Tom');
console.log(people.greeting()); // Hi! I am Tom.
```

共享的环境被创建于 `makePeople` 函数体内，在此环境中我们声明了一个私有变量（privateName）和一个私有方法 （setName）。这些私有的成员无法在 `makePeople` 函数外被访问, 只能通过在 `makePeople` 函数内创建并返回的闭包来访问。

接着上面的例子：

```javascript
const people1 = makePeople();
const people2 = makePeople();

people1.changeName('Tom');
people2.changeName('Bob');

console.log(people1.greeting()); // Hi! I am Tom.
console.log(people2.greeting()); // Hi! I am Bob.
```

这次我们通过同一个 `makePeople` 函数创建了两个 people, 但是 `people1` 和 `people2` 都保存着各自独立的私有成员，互不干扰。这是因为每次 `makePeople` 执行时，都会创建一个新的环境，所以两次创建的 people 关联着不同的环境（`people1` 和 `people2` 互相独立），但是同一个 people 内的闭包（`changeName` 和 `greeting`）都共享同一个环境。

## 总结
这篇文章从一个问题出发，探索解决之道，结合 JavaScript 中的闭包实现，以理论的形式来阐述闭包的概念。希望可以帮助大家更容易的理解闭包。
