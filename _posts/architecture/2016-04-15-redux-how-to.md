---
title:  "Redux 指导与Redux 式编程"
date:   2016-04-18 15:18:42 +0800
tags:  dataflow, javascript
excerpt: >
  Redux 是用于 JavaScript apps 的一个可预测的状态容器。
  Redux 帮助我们写出保持行为一致性的应用程序，易于测试，简化交互逻辑。
  本篇文章将会向大家介绍 Reudx 的基础概念，并通过几个循序渐进的示例程序演示我们如何应用 Redux 帮我们开发。
---
## Redux 是什么？

[Redux] 是 [Flux] 的简单实现，而 Flux 是 facebook 提出的单向数据流架构。

Redux 是用于 JavaScript apps 的一个可预测的状态容器。

## Redux 可以为我们做什么？

Redux 帮助我们写出保持行为一致性的应用程序，易于测试，简化交互逻辑。

## Redux 基础概念

### State

State 描述一个应用程序的全部状态，当我们设计应用程序时，因为是描述全部状态，所以一个应用程序的 state 对象只有一个形状(shape)。

所有需要控制的状态都应设计到 state 对象中。一个 Todo App 的状态看起来是这个样子

```js
{
  todos: [
    {
      text: '学习es6',
      state: '已完成'
    },
    {
      text: '学习react',
      state: '已完成'
    },
    {
      text: '学习redux',
      state: '进行中'
    },
    {
      text: '实战',
      state: '未完成'
    }
  ]
}
```

在上述定义的基础上，我们想添加一个搜索功能。这时候 state 看起来是这个样子的

```js
state = {
  searchText: 'redux',
  todos: [
    //...
  ]
}
```

### Action

Action 是应用程序与 store 通信的信息聚合对象，store 的唯一数据源。

Action 用来描述一个行为，并负载相应的信息。

比如我们在一个 Todo App 中， 我们可以这样定义新增 action

```js
const ADD_TODO = 'ADD_TODO'

let action = {
  type: ADD_TODO,
  text: '学习redux'
}
```

### Reducer

我们已经用 action 定义发生了什么， 下一步当然是如何处理 action，这就是 reducer。

Redux 定义的 Reducer 接口是这样子的 

```ts
type Reducer<S, A> = (state: S, action: A) => S
```

Reducer 接收两个参数，第一个参数是当前状态，而第二参数是 action, 返回更新后的状态。

> Reducer 一定要定义为[纯函数][pure function]，我们应该返回一个包含新 state 的对象来替代对原对象的直接修改。
>
> 返回新的 state 对象替代修改原对象使 redux 通过比较对象引用检测改变，而不用像 flux 一样在每个变化点用代码通知变化。

现在让我们定义一个 reducer 来处理 action。

```js
function todoApp(state = [], action) { 
  switch (action.type) { //上面定义的 action =  { type: ADD_TODO, text: '学习redux' }
    case ADD_TODO:
      const { text } = action;
      return [
        ...state,
        {
          text,
          state: '未完成'
        }
      ];
    default:
      return state;
  }
}
```

### Store

Store 是管理应用程序 state 的容器，连接之前介绍的各个部分，定义如下

```js
type Store = {
  dispatch: Dispatch
  getState: () => State
  subscribe: (listener: () => void) => () => void
  replaceReducer: (reducer: Reducer) => void
}
```

它是这样工作的

![store workflow][store]

## 怎么使用？
了解了redux的基本概念后，我们可以开始实践了。
接下来我通过几个渐进式的示例展示一下 redux 的使用方式

### Couter 
<small>redux 的简单应用</small>

一个简单的计数器（官方示例的简化）

redux 的流程非常简单，这使我们的逻辑可以很清晰简洁。通过 `store.dispatch` 方法发射 `action` ，`store` 调用 `reducer` 更新 `state`，然后调用` subscribe` 方法注册的回调。

借助 redux 我们只需要描述我们应用的 state 和 action, 定制 reducer，然后注册一个回调方法处理新的 state。

Couter 的 state 很简单, 只有一个状态来指示计数器的值

```js
 state = 0; //初始为0
```
Counter 需要有增加和减少两个操作，这是我们的 action

```js
{
  type: 'INCREMENT',
}

{
  type: 'DECREMENT',
}
```

然后我们需要一个 reducer 来处理 action

```js
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

接下来显示计数器的数值

```js
let counter = document.getElementById('count');

function render() {
  counter .innerHTML = store.getState().countOne.toString();
}
```

嗯，非常简单是不是，然后让我们用 redux 把这几部分连接起来

```js
var store = Redux.createStore(counterReducer); // 完整api用法请参考文档

store.subscribe(render);

//我们可以在任何地方调用 dispacth 来发送 action
store.dispatch({
  type: 'DECREMENT'
})

store.dispatch({
  type: 'DECREMENT'
})
```

完整示例 [Couter][demo1]

### More Couter 
<small>学习 combineReducers</small>

人类是难学会知足的，有了一台 win, 又想要台 mac, 有了一个可用 ~~wife~~, 哦不！是 wifi！ 又想找更多的。

我们也当然不会满足单个计数器，让我们再添加另一个计数器。

这时候我们的 state 应该可以表示两个计数器的状态

```js
  let initState = {
    countOne: 0,
    countTwo: 0 
  }
```

再看下我们的 reducer 变成什么样了

```js
function counterReducer(state = initState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        countOne: state.countOne + 1,
        countTwo: state.countTwo + 1 
      };
    case 'DECREMENT':
      return {
        countOne: state.countOne - 1,
        countTwo: state.countTwo - 1 
      };
    default:
      return state;
  }
}
```

嗯，确实可以工作，不过这样写有几点问题

* 每增加一个状态就要修改 reducer
* 不相干的状态也要在一起维护
* 不利于扩展

理想情况我们想将 app 的状态拆解为几个子状态，为各个子状态定义相应的 reducer。

我们需要一个有神奇的魔法师，我们告诉他我们应用的各个子状态名和相应的 reducer， 他为我们返回一个处理所有状态的 reducer。事实上，有这样的魔法师！

他就是 `combineReducers`!

```js
function alwaysEqOneReducer(state, action) {
  return 1;
}

function alwaysEqTwoReducer(state, action) {
  return 2;
}

let rootReducer = Redux.combineReducers({
  stateOne: alwaysEqOneReducer,
  stateTwo: alwaysEqTwoReducer
});

let curState = {};
let state = rootReducer(curState, someAction);
//state = { stateOne: 1, stateTwo: 2}
```

利用 `combineReducers` 我们可以重用之前的 reducer

```js
let rootReducer = combineReducers({
      countOne: counterReducer,
      countTwo: counterReducer
    });

let store = Redux.createStore(rootReducer);
```

为了除去 combineReducers 的神秘面纱， 我提供了一个简化的实现。

完整示例 [More Couter][demo2]

### Real More Couter
<small>使用 high-order function</small>

不幸的是，上一个应用好像存在点问题，我们的确设置了两个 state 来存储两个计数器的状态，但是他们的状态却一直保持着同步。

幸遇的是，你看到了这里！

聪明的人已经看出问题的根源就是 reducer.

我们完全共用了 reducer, 同一个action会被他们共同处理，这是不是就是说我们没办法重用 reducer 呢？

并不是，我们需要用的更有技巧性。

上一个示例，我们介绍了 combineReducers，它是一个 [high-order function]。 我们现在需要使用同样的技术来为帮我们处理单个的 reducer。

我们要做的就是使一个 reducer 只处理指定了自己为目标的 action。

```js
/**
 * @params {String} identifier 标识符， 
 * @return {Function} 只处理带有同样 identifier 的 action 的 reducer
 */
function identify(identifier, reducer) {
  return function identifiable(state, action) {
    //!important undefined 代表是初始化,需要返回缺省状态，直接委托给原reducer
    let initState = null; 
    if (typeof state === 'undefined') {
      initState = reducer(state, action);
    }

    let nextState = action.identifier === identifier 
      ? reducer(state, action)
      : state;
      
    return initState !== null ? initState : nextState;
  };
}
```

现在我们的 action 需要带有 identifier 

```js
let reducer = identify('one', counterReducer),

reducer(1, {
  type: 'DECREMENT'
})
// return 1

reducer(1, {
  type: 'DECREMENT',
  identifier: 'foo'
})
//return 1

reducer(1, {
  type: 'DECREMENT',
  identifier: 'one'
})
//return 0
```

完整示例 [Real More Couter][demo3]

## 结论

redux 的 low-level api设计，函数式编程，给了我们很大的灵活性去做一些如 `identify` 这样的 magic。

redux 的单向数据流设计使我们可以很清晰的分解程序的逻辑，拆解应用状态，使混乱的逻辑变得有条理，可预测。

理想情况下我们应把视图理解为 state 的纯函数，同样的 state 总是渲染出同样的视图。

[store]: {{ site.imgPath }}/store.png
[Redux]: https://github.com/reactjs/redux/
[Flux]: https://github.com/facebook/flux
[pure function]: https://en.wikipedia.org/wiki/Pure_function
[high-order function]: https://en.wikipedia.org/wiki/Higher-order_function
[demo1]: https://jsfiddle.net/liximomo/haxcngew/
[demo2]: https://jsfiddle.net/liximomo/aptp4nua/
[demo3]: https://jsfiddle.net/liximomo/35n9r9aq/
