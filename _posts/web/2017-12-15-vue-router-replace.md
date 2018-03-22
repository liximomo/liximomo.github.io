---
title:  "vue-router 高级路由设计"
date:   2017-12-15 13:56:00 +0800
tags:  vue vue-router
excerpt: >
  vue-router 中“路由”层级和“组件”层级不一致的解决方案。
---

## 场景

在 vue-router 的使用中，面临了一个问题，那就是 vue-router 的正确工作是建立在 `component` 层级和 `route` 层级一致的情况下。如下路由定义:

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

`List` 组件必需在自己的模板内包含 `router-view` 组件，`detail` 路由才有机会被匹配。

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

在这种情况下，`List` 和 `Detail` 组件会同时出现。如下：

<iframe src="https://codesandbox.io/embed/jljoj11xz5?autoresize=1&hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

实际中我的需求是，当进入 `detail` 路由时，`Detail` 组件替换掉 `List` 组件，页面中只显示 `Detail` 组件。

## 剖析
这个问题初看很简单，如果只是为了达到 `List` 和 `Detail` 同时只有一个存在，只需将路由重新设计为扁平化的即可。然而我必须保持路由的层级设计，因为 `breadcrumb` 导航需要这个层级以正确工作。这个时候有人可能会思考，为 `breadcrumb` 导航单独配置，使它不在依赖路由，这个问题不就解决了？这样一来又引入了新的问题，每次路由变更时，都得重新配置导航。

## 解决方案
最终，我采取了高阶组件的方式，为组件提供子路由匹配时，将自己”隐藏“的功能。

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

关于如何判断当前最深匹配的路由是否与自身路由匹配这个问题，我们可以通过 `$route.matched` 来判断，`$route.matched` 存放的是当前所有匹配的路由，有外而内存放。`$route.matched` 数组中的最后一个路由就是当前最深匹配路由。拿到了最深路由后，我们可以进一步通过 `route.instances.default` 取得此路由设置的 `component` 的实例，然后与当前 `vue` 实例比较一下即可。最后我们通过 `vue` 的 `render` 方法来完成条件渲染。
 
具体实现：

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

工作示例：
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

对此我是不认可的，强制路由层级和组件层级匹配，这样做增强了二者的耦合性。对路由本身而言它是没有组件这个感念的，毕竟它的名字就叫路由，而不是组件路由，页面路由。路由本身只应作为一个工具，告诉我们当前的 url 是否和其相定义相匹配，之后具体是路由到一个页面，一个组件，还是一个简单的回调则应由用户去控制。

对比 `react-router` (v4)， 正真意义上实现了 `router` 的本质 —— pattern matcher，借助其我们可以完成很多复杂的需求。这里推荐一下 [page stack](http://tech.colla.me/zh/show/line_manga_smooth_transition_with_page_stack) 这篇文章。

## 结语
熟悉 vue 中 `render` 方法以及 `vnode`, 在很多场景下，我们都需要借助他们来实现需求。
