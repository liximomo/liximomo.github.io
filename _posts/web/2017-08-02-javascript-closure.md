---
title:  "JavaScript 闭包"
date:   2017-08-02 +0800
tags:  JavaScript closure
layout: post
excerpt: >
  函数在 JavaScript 中被作为 first-class citizens 对待，这通常是函数式编程语言的基础。闭包作为在函数式编程语言中经常使用的技术，也成为了 JavaScript 中不可或缺的强大工具。
---

## 定义
JavaScript 中函数是 [First-class function](https://en.wikipedia.org/wiki/First-class_function), 这是函数式语言，也是闭包的基础。什么是闭包呢？我们可以这样去理解：

```
函数 + 函数创建时的环境 = 闭包
```

### 环境
一个函数的环境分为“调用时环境”和“创建时环境”，当一个函数要和环境绑定时，应该采用哪个呢？在 JavaScript 中是创建时环境，这主要是因为 JavaScript 采用了 static scope（静态范围）。

> **Static scope:** 如果可以仅凭查看源代码就可以决定解析一个变量所使用的环境，就说这个语言实现了静态范围。

Static scope 有时也被称为 lexical scope（词法范围）。

技术上来说，static scope 是通过捕捉函数创建时的环境来实现的。

### 闭包
通常人们对闭包的理解是不完全的，认为只有嵌入的函数才是闭包。但其实任何拥有 free variable（自由变量）的函数都是以闭包的形式存在的，换种说法，闭包是解决 free variable 问题的一种方法。

> **Free variable:** 一个变量，既不是函数参数，也不是函数的本地变量，则称为 free variable。

```js
let x = 10;
 
function foo() {
  console.log(x);
}
 
function bar(funArg) {
  let x = 20;
  funArg(); // 10, 而不是 20!
}
 
// 将 `foo` 最为参数传给 `bar`.
bar(foo);
```

对 foo 函数来说，变量 x 就是一个 free variable。单靠 foo 函数的定义本身，是无法解析 x 变量的，我们还需将 x 所在的环境保存下来，才可以解析变量 x。另一方面，由于使用了创建时环境，foo 虽然是在 bar 中被调用的，并且 bar 的环境中提供了 foo 所依赖的变量 x（20），但 foo 中的 x 依然解析到了其所处的创建时环境中，也即是10。

我们可以通过伪代码来表示上述示例中所有的环境：

```js
globalEnvironment = {
  x: 10
};

fooCreateEnvironment = globalEnvironment;

barCreateEnvironment = globalEnvironment;

fooCallEnvironment = {
  x: 20
};
```

我们来看看另一种更典型的闭包：
```js
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

从技术上来说，它和第一种并没有区别，都是保存了创建时所处的环境。

值得一提的是，同一个环境可以被多个闭包共享。这使我们可以访问和修改共享的数据：

```js
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

示例中的两个闭包（increment 和 decrement）都创建于一个包含 count 变量的代码块（范围）内，它们共享着父环境的引用。用伪代码来表示成：

```js
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
闭包一个非常有用的特性就是它允许你将一些数据（环境）与一个可以操作这些数据的函数关联起来。这很容易奖和面向对象编程联系起来，在面向对象编程中，对象允许我们将数据（对象的属性）和方法（函数）关联起来。

### 函数工厂
汽车工厂生产的是汽车，函数工厂生产的是函数，在 JavaScript 中一个函数工厂就是创造函数的函数。

在一个项目中，我们经常需要使用各种函数来将一个参数和固定的数字相加，我们可以把每一个函数都声明出来：

```js
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

```js
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

```js
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

```js
const people1 = makePeople();
const people2 = makePeople();

people1.changeName('Tom');
people2.changeName('Bob');

console.log(people1.greeting()); // Hi! I am Tom.
console.log(people2.greeting()); // Hi! I am Bob.
```

这次我们通过同一个 `makePeople` 函数创建了两个 people, 但是 `people1` 和 `people2` 都保存着各自独立的私有成员，互不干扰。这是因为每次 `makePeople` 执行时，都会创建一个新的环境，所以两次创建的 people 关联着不同的环境（`people1` 和 `people2` 互相独立），但是同一个 people 内的闭包（`changeName` 和 `greeting`）都共享同一个环境。
