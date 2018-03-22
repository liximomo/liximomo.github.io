---
title:  "“计算属性”是怎样拯救React的"
date:   2018-02-21 +0800
tags:  JavaScript React
layout: post
excerpt: >
  对 React 的性能优化80%集中在 shouldComponentUpdate，而维持数据的不可变又可以将 shouldComponentUpdate 的计算耗时维持在最小量。在 React 的开发中，我们经常不可避免的破坏“引用不变”这一约束。让我们看看计算属性是怎样帮助我们解决这一问题的。
---

## 组件开发中面临的问题

### props 传值
如下 List 的组件负责将联系人以列表的形式展现出来，items 属性负责接收一个联系人数组。它要求每个联系人都有一个 id 和 data 属性，但我们的联系人数据只是个简单的字符串数组。这时候我们可以选择将数据做一层包装。

```jsx
render() {
  const wrapped = this.contactList.map((contactName, index) => ({
    id: `${index}@${contactName}`,
    data: contactName,
  }));

  return <List items={wrapped} renderItem={this.renderItem()} />;
}
```

`List` 组件在 `shouldComponentUpdate` 方法中使用的引用比较来避免不必要的更新，但我们每次 `render` 都会产生一个新的 `wrapped` 对象，这就导致了 `shouldComponentUpdate` 失效，在数据非常多的时候会严重影响性能。

### 复杂计算
在组件设计中我们通常会按照最简接口原则来设计来提高组件的易用性，然后在组件内部通过计算来获得实际渲染需要的数据。考虑一个 FilterList 组件，接收一组数据和约束来过滤满足约束的数据，我们希望在数据和约束都没有变化的情况下可以必要在此计算，直接返回之前的结果。

## Recomputed
在日常的组件开发中，上述问题几乎不可避免的重复出现。我们来看看基于计算属性的 [recomputed](https://github.com/liximomo/recomputed) 是如何帮助我们解决这些问题的。

### 计算属性
计算属性可以帮助我们生成一个函数获取衍生值，但和普通的函数不同的是他会缓存计算结果，只当依赖的输入发生变化时才重新计算，可以保证数据不变的情况下结果的引用不变。借助 `recomputed` 我们方便的解决 prop 传值问题。

```jsx
import recomputed, { $state } from 'recomputed';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactList: ['foo', 'bar'],
      favorite: 'foo',
    };

    const composer = recomputed(this);

    this.getContacts = composer(
      $state('contactList'),
      contactList => list.map((contactName, index) => ({
        id: `${index}@${contactName}`,
        data: contactName,
      }));
    );

    // depend on an exist computed
    this.getFavorite = composer(
      this.getContacts,
      $state('favorite'),
      (contacts, favorite) => contacts.find(contact => contact.data === favorite);
    );
  }

  renderItem(data) {
    // render data
  }

  render() {
    const contacts = this.getContacts();
    return <List items={contacts} renderItem={this.renderItem()} />;
  }
}
```

`recomputed` 可以为任何对象(计算上下文)提供计算属性，同时还有丰富的装饰器可以用来增强功能，现在已经成为我日常开发中必不可少的利器了。
