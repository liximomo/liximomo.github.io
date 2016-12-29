---
title:  "响应式 Meta Tag"
date:   2016-05-01 10:23:33 +0800
tags:  meta, viewport, mobile
---

为什么需要为移动设备使用 `<meta name="viewport" content="width=device-width, initial-scale=1" >`，逻辑像素和物理像素到底是什么，他们是什么样的关系，设备像素比率又是什么？

<!--more-->
## 三块屏幕

### 1.视点布局(Vewport Layout)

视点布局是浏览器计算位置的坐标系，也即是 css 中的坐标系。逻辑分辨率(Logical Resolution)描述视点布局窗口的大小。

### 2.渲染屏幕(Rendered Pixels)

这是一个中间层，css中的像素(逻辑像素或设备独立像素) * 设备像素比率(device-pixel-ratio) = 渲染的像素。设备像素比率为1的设备上，图像的解析度不会改变，在设备像素比率(Retian屏幕)上，图像会变模糊，想象一下肉眼和放大镜看皮肤毛孔的区别。所以通常需要为这类设备准备高分辨率的图像。更好的解决方案是使用矢量图形。

> 设备像素比率(device-pixel-ratio)  
> 物理像素 / 设备独立像素 = 设备像素比率

### 3.设备屏幕

对于大部分设备，这就是最后一层，一个渲染像素就等于一个物理像素。但是苹果的一些设备，如启用了 scaled resolution enabled 的 iPhone 6 Plus， 它的设备像素比率并不是通过`物理像素/设备独立像素`计算得来的，会比计算的值偏大，这导致上一步计算的渲染的像素的像素密度高于屏幕实际可以显示的像素密度，渲染的像素还要进行缩放才可以显示在屏幕上。


## Howto

作为开发人员，我们并不需要关心那么多概念，只需关注如何使页面在移动设备上显示良好。在响应式设计或移动Web开发当中经常见到这句代码:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" >
```
这里的 width 控制 viewport 宽度，device-width 指的是当页面缩放为100%时，css 像素表示的设备宽度。通过`width=device-width`告诉浏览器将 viewport 宽度设置为设备宽度。此时页面的渲染效果就和我们将浏览器窗口缩放到320px宽时一样。而指定了`initial-scale=1`，`width=someValue`的语义就变成了最小 viewport 宽度，这样在设备切换屏幕方向时，浏览器就会扩展 viewport 宽度，而不是通过放大页面来填充屏幕。
