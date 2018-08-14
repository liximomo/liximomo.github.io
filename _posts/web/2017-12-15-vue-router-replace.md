---
title:  "vue-router 高级路由设计"
date:   2017-12-15 13:56:00 +0800
tags:  vue vue-router
excerpt: >
  vue-router 中“路由”层级和“组件”层级不一致的解决方案。
---

## 场景

在 vue-router 的使用中，有时会面临这样一个问题，那就是 vue-router 的设计要求 `component` 层级和 `route` 层级保持一致。

当有如下的路由定义时:

```javascript
const route = {
  path: '/list',
  name: 'list',
  component: List,
  children: [{
    path: 'detail/:id',
    name: 'detail',
    component: Detial,
  }]
}
```

则 `List` 组件需在自己的模板内包含 `router-view` 组件，`/list` 与 `detail/:id` 路由的层级关系要在组件中体现出来。

```jsx
// in List.vue
<template>
  <div id="list">
    <h5>This is list.</h5>
    <router-view></router-view>
  </div>
</template>
```

在这种情况下，当导航至 `/list/detail/1` 时, `List` 和 `Detail` 组件会同时渲染至页面中。如下：

<iframe src="https://codesandbox.io/embed/jljoj11xz5?autoresize=1&hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

在大多数情况下我们普遍的期望是当进入 `detail` 路由时，页面中只显示相应的 `Detail` 组件，而不在显示 `List` 组件。

## 问题
这个问题初看很简单，如果只是为了达到 `List` 和 `Detail` 同时只有一个存在，只需将路由重新设计为扁平化的即可。然而这会破坏这两个路由本身所拥有的父子语义，因为 UI 的表现而去破坏语义是不理想的。其次，我们项目中还有一个根据路由层级自动生成的面包屑导航，破坏 `list` 和 `detail` 的父子关系会导致面包屑导航无法正确工作。

## 思路
```
    +---------------------+
    |   当前最深匹配的路由   | 
    |       是否与         | 
    |    自身路由匹配       |
    +---------------------+
               |
         yes   |     no
      +--------+--------*
      |                 |
      v                 v  
  +------+        +------------+
  | show |        |    show    |
  | self |        | child route|
  +------+        +------------+    
```

`$route.matched` 存放着当前所有匹配的路由, 中的最后一个项就是当前匹配层次最深的路由。我们可以通过路有对象的 `instances.default` 取得与此路由相关联的 `component` 实例，然后与当前组件实例比较一下即可。最后我们通过手写 `vue` 的 `render` 方法来完成条件渲染。

最终，我们采取了高阶组件的实现方式，为组件提供子路由匹配时，将自己”隐藏“的功能。

实现：

```javascript
export default function routeReplaceSelf(component) {
  return {
    name: 'routerReplaceSelf',
    computed: {
      showChild() {
        const deepestMatchedRoute = this.$route.matched[this.$route.matched.length - 1];
        return deepestMatchedRoute.instances.default !== this;
      },
    },
    render(h) {
      return this.showChild ? h('router-view') : h(component);
    },
  };
}
```

示例：
<iframe src="https://codesandbox.io/embed/wnzmv22ww8?autoresize=1&hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

还有一个小问题，当从子路由返回父组件时，父组件会重新 `mount`。这里可以借助 `keep-alive` 来缓存组件避免不必要的 `mount`。

```javascript
render(h) {
  const child = this.showChild ? h('router-view') : h(component);
  return h('keep-alive', [child]);
},
```

## 思考
在解决上述问题时，尤大在相关 [issue](https://github.com/vuejs/vue-router/issues/745#issuecomment-263410514) 内说到

> I think this breaks the relationship between route config nesting and router-view nesting and can make things a bit harder to reason about.

对此我是不认可的，强制路由层级和组件层级匹配，这样做增强了二者的耦合性。对路由本身而言它是没有组件这个感念的，毕竟它的名字就叫路由，而不是组件路由，页面路由。路由本身只应作为一个工具，告诉我们当前的 url 是否和其相定义相匹配，之后具体是路由到一个页面，一个组件，还是一个简单的回调则应由用户去控制。`react-router` (v4) 就是一个充分体现了路由灵活性的实例，借助其我们可以完成很多复杂的需求。这里推荐一下 [page stack](http://tech.colla.me/zh/show/line_manga_smooth_transition_with_page_stack) 这篇文章。
