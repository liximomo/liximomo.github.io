---
title:  "页面性能指标"
date:   2017-06-21 11:00:00 +0800
tags:  web performance
excerpt: >
  页面的性能对用户来说是很重要的一个体验，并且会严重影响到SEO, 品牌拥护度和用户粘性。我们应该如何判断一个页面的性能好坏？那个指标对用户体验的影响最大？
---

在我们考虑性能时，不应该单纯的考虑页面的加载时间，而是要从用户方面来定义多个测量指标反映用户的感知。

## 指标

### 首次绘画（First contentful paint）
浏览器开始从 DOM 中绘制元素。用户可以从中得知页面导航已经完成并且服务器已成功的响应。

### 首次有意义的绘画（First meaningful paint）
对用户有意义的绘画发生在何时，有意义的定义随着网页所提供的不同服务所变化。一个页面中“最重要的部分”是最有价值的，比如优酷的视频播放页，视频播放器就是最重要的部分，在一个天气应用中，则是天气预测和位置。如果最重要的部分尽可能的快速展现在用户面前，用户或许会忽略掉页面中其他元素还没有加载完成。

### 耗时任务（Long tasks）
浏览器中的JavaScript 是单线程的，浏览器响通过将任务添加入队列来响应用户输入，队列中的任务会在主线程中依次执行。主线程也是浏览器执行应用程序的 JavaScript 的地方。

在某些情况下，这些任务需要一段比较长的时间来运行，如果发生了这种情况，主线程会被阻塞，队列中的所有其他任务都必须等待。使用 [Long Tasks API](https://w3c.github.io/longtasks/) 可以标示出耗时大于 50 毫秒的任务。

### 首次交互时间（Time to interactive）
首次交互时间（TTI）表示网页用在视觉上已经渲染完毕，并且可以对用户的输入做出相应。一个应用可能会因为一下几种原因而无法响应用户输入：

* 为组件提供交互功能的 JavaScript 可能还没用加载完毕。
* 正在进行的耗时任务阻塞了主线程。

TTI 度量代表页面的初始 JavaScript 加载完成并且主线程处于空闲状态。

## 测量
现代浏览器提供了很多新的 API 来帮助我们进行性能测量。如 [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver), [PerformanceEntry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry), 和 [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), 利用这些 API 我们可以方便的测量各项指标。

### FP/FCP
**我们必须确确保 PerformanceObserver 出现在文档的 `<head>` 中，并且要先于样式表，这是为了保证它可以在 FP/FCP 发生之前执行。**

```html
<script>
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // `name` will be either 'first-paint' or 'first-contentful-paint'.
    const metricName = entry.name;
    const time = Math.round(entry.startTime + entry.duration);

    console.log('eventAction: ', metricName);
    console.log('eventValue: ', time);
  }
});
observer.observe({entryTypes: ['paint']});
</script>
```

### TTI
虽然目前 TTI 还没有被标准化且被浏览器实现在 PerformanceObserver 中，但我们可以使用 [tti-polyfill](https://github.com/GoogleChromeLabs/tti-polyfill) 来在支持 [Long Tasks API](https://w3c.github.io/longtasks/) 的浏览器中检测 TTI。

这个 polyfill 提供了 `getFirstConsistentlyInteractive()` 方法, 这个方法返回一个解析值为 TTI 值的 `promise`。我么可以这样来监测 TTI:

```javascript
import ttiPolyfill from 'tti-polyfill';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  // Use `tti` value in some way.
});
```

### Long tasks
可以通过创建一个 `PerformanceObserver` 实例来观测 longtask。Long task entries 包含一个 [attribution property](https://w3c.github.io/longtasks/#sec-TaskAttributionTiming), 我们可以很简单的追踪到造成 long tasks 的代码:

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(Math.round(entry.startTime), Math.round(entry.duration), JSON.stringify(entry.attribution))
  }
});

observer.observe({entryTypes: ['longtask']});
```

我们可以从 attribution property 中得到响应的 frame context, 这可以帮助我们判断是否是第三方的 iframe scripts 触发的问题。

### Input latency
阻塞主线程的 Long tasks 会阻止事件监听器及时的实行.

输入延迟应该低于 100ms, 我们可以通过比较事件时间戳和当前时间来检测 Input latency。

```javascript
const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
  // Event listener logic goes here...

  const lag = performance.now() - event.timeStamp;
  if (lag > 100) {
    console.log('input latency': Math.round(lag))
  }
});
```

事件延迟通常是由于 long task 造成的，我们可以组合 event latency 和 long task 的检测逻辑：long task 阻塞主线程的时刻和 e `event.timeStamp` 是否相同。

然而这个方法并不完美（它不会处理后续传播阶段耗时的 event listeners，也无法处理运行在非主线程中的滚动或组合动画，但却是理解长时间运行的 JavaScript 对用户体验的影响的一个好的开始。

### 放弃加载（Load abandonment）
用户通常会放弃加载并离开一个页面如果它加载时间过长。这就代表我们的所有其他测量值都存在着[幸存者偏差](https://baike.baidu.com/item/幸存者偏差/10313799), 我们的测量数据中并不会包含那些放弃等待页面加载完成的用户数据。

虽然我们不能获取过些放弃等待页面加载完成的用户的各项数据，但我们可以追踪这些用户在页面停留了多久。

**请将这段代码放在文档的 `<head>` 中。**

```html
<script>
window.__trackAbandons = () => {
  // Remove the listener so it only runs once.
  document.removeEventListener('visibilitychange', window.__trackAbandons);
  const ANALYTICS_URL = 'https://your.server.com/collect';
  const CLIENT_ID = Math.random() * Math.pow(2, 52);

  // Send the data to your server via the Measurement Protocol.
  navigator.sendBeacon && navigator.sendBeacon(ANALYTICS_URL, [
    'event=abandon',
    'dl=' + encodeURIComponent(location.href),
    'dt=' + encodeURIComponent(document.title),
    'cid=' + CLIENT_ID,
    'ev=' + Math.round(performance.now()),
  ].join('&'));
};
document.addEventListener('visibilitychange', window.__trackAbandons);
</script>
```

同时，我们还要确保页面可以交互时移除这个事件监听器。

```javascript
document.removeEventListener('visibilitychange', window.__trackAbandons);
```

## 优化性能
当我们在优化各项测量指标时，同时也提升了用户体验，这就是以用户为中心来定义测量指标为我们带来的好处。

最简单的提升性能方式就是递交更少的 JavaScript 代码，但这并不总是可行的，我们还需要思考递交 JavaScript 的方式。

### 优化 FP/FCP
我们可以通过从文档中的 `<head>` 移除任何阻塞渲染的脚本和样式表来减少 FP/FCP。

标示影响首屏内容的重要样式，然后将其内联到 `<head>`（或者通过 HTTP/2 server push），我们可以获得非常快的首次渲染时间。

应用骨架（App Shell）模式对 Progressive Web Apps 来说是一个很好的例子。

### 优化 FMP/TTI
一旦我们标示出了页面中最重要的 UI 元素， 我们要确保初始脚本只包含使这些元素可以渲染和交互的代码。

初始 JavaScript 代码块中，任何和这些元素不相关的代码都会延迟 TTI。没有理由让用户去下载和解析他们当前不需要的代码。

作为一个通用的规则，我们应该尽可能的减少 FMP 与 TTI 之间的时间。如果我们实在无法做到减少这个时间，那一定要在 UI 中表现出页面当前还处于不可交互的状态。

对用户来说最让人阻扰的体验之一就是点击一个元素却没有任何反应。

### 阻止 long tasks
通过分割代码以及调整它们的加载优先级，我们不仅可以使页面更快的可以交互，而且可以减少 long tasks。

除了将代码分割到独立的文件，我们还可以将比较大的同步执行的代码块切分成多个可以异步执行的较小的代码块，或者将其延迟到下一个空闲点执行。通过异步执行较小的代码块，我们可以给主线程更多的时间去响应用户输入。

最后，我们还应确保对第三方代码进行测试，了解运行缓慢的代码。产生许多 long tasks 的第三方广告或统计代码对我们造成负面影响可能要比获得的收益更多。
