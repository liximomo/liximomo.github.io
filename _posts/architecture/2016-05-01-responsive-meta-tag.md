---
title:  "浏览器的三块屏幕与响应式 Meta Tag"
date:   2016-05-01 10:23:33 +0800
tags:  meta, viewport, mobile
---

为什么需要为移动设备使用 `<meta name="viewport" content="width=device-width, initial-scale=1" >`，逻辑像素和物理像素到底是什么，他们是什么样的关系，设备像素比率又是什么？

<!--more-->

## 三块屏幕

### 1.视口布局(Viewport Layout)

视口布局是浏览器计算位置的坐标系，也即是 css 中的坐标系。逻辑分辨率(Logical Resolution)描述视口布局窗口的大小。

### 2.渲染屏幕(Rendered Pixels)

这是一个中间层，css中的像素(逻辑像素或设备独立像素) * 设备像素比率(device-pixel-ratio) = 渲染的像素。设备像素比率为1的设备上，图像的解析度不会改变，在设备像素比率高的设备上(Retian屏幕)，图像会变模糊。这就好比肉眼下很光滑的皮肤，在放大镜下则显得非常粗糙。所以我们通常需要为这类设备准备高分辨率的图像防止图形变模糊，但更好的解决方案是使用矢量图形。

> 设备像素比率(device-pixel-ratio)  
> 物理像素 / 设备独立像素 = 设备像素比率

### 3.设备屏幕

对于大部分设备，这就是最后一层，一个渲染像素就等于一个物理像素。但是苹果的一些设备，如启用了 scaled resolution enabled 的 iPhone 6 Plus， 它的设备像素比率并不是通过`物理像素/设备独立像素`计算得来的，会比计算的值偏大，这导致上一步计算出的实际渲染像素要多于屏幕实际可以显示的像素，这些像素还需要进行适当的缩放，最终才可以显示在屏幕上。

## Howto

在移动Web开发中，浏览器默认的视口布局大小并不等于渲染屏幕，我们需要借助 `meta` 标签:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" >
```

这里的 `width` 控制视口宽度，`device-width` 指的是当页面缩放为100%时，css 像素表示的设备宽度。通过`width=device-width`告诉浏览器将 viewport 宽度设置为设备宽度。如果设备宽为320px，那么此时页面在设备上的渲染效果就和我们将浏览器窗口缩放到320px宽时一样。
