---
title: "程序人生"
layout: page
permalink: /resume
css: ["resume.css"]
excerpt: >
  简历
---

<section class="sectionLayout sectionLayout--info">
  <header>
    <h2>个人信息</h2>
  </header>
  <dl>
    <dt><span class="boxWithWidth">基础</span></dt>
    <dd>李玺/男/1992</dd>

    <dt><span class="boxWithWidth">学历</span></dt>
    <dd>软件工程/广西民族大学/本科</dd>

    <dt><span class="boxWithWidth">籍贯</span></dt>
    <dd>渭南/陕西</dd>

    <dt><span class="boxWithWidth">工作年限</span></dt>
    <dd>2.5年</dd>

    <dt><span class="boxWithWidth">Blog</span></dt>
    <dd><a href="https://liximomo.github.io">https://liximomo.github.io</a></dd>

    <dt><span class="boxWithWidth">Github</span></dt>
    <dd><a href="https://github.com/liximomo">https://github.com/liximomo</a></dd>

    
    <dt><span class="boxWithWidth">Twitter</span></dt>
    <dd><a href="https://twitter.com/liximomo">https://twitter.com/liximomo</a></dd>
  </dl>
</section>

<hr>

<section class="sectionLayout sectionLayout--skill">
  <header>
    <h2>技能</h2>
  </header>
  <p>熟悉浏览器页面加载模型，chrome developer tools 调试调优。掌握多种语言，拥有前、后端开发经验，扎实的 js/css/html 知识。对 react 理解通透，读过部分源码（vdom, 事件处理）。</p>
  <p>曾经用 c++ 写过游戏， 用 java 写过 GUI, 用 python 写过 web。目前专注于 UI/UX，javascript 语言，函数式编程，functional reactive programming。将困难看作问题来解决，秉着写作的理念来编程。真正的能力只有两个：学习和解决问题。</p>
</section>

<div class="print-page-break"></div>
<hr class="no-print">

<section class="sectionLayout sectionLayout--oss">
  <header>
    <h2>开源</h2>
  </header>
  <section class="sectionLayout">
    <h3>SFTP - Visual Stadio Code extension</h3>
    <p><a href="https://github.com/liximomo/vscode-sftp">https://github.com/liximomo/vscode-sftp</a></p>
    <p>一个利用 sftp/ftp 协议同步文件的编辑器扩展，目前同分类安装数排名第三，评分第一。</p>

    <h3>filed-server</h3>
    <p><a href="https://github.com/liximomo/filed-server">https://github.com/liximomo/filed-server</a></p>
    <p>为本地文件提供链接分享的 cli 工具，可以预览文件，查看原始文件，一键下载。主要用于局域网文件传输。</p>

    <h3>mo</h3>
    <p><a href="https://github.com/liximomo/mo">https://github.com/liximomo/mo</a></p>
    <p>通过 json 配置文件提供 api 服务的 mock server。提供多种 api 生成策略。附带了一个 apidoc 文档页生成 json 配置的转化器。</p>

    <h3>more</h3>
    <p><a href="https://liximomo.github.io">https://liximomo.github.io</a></p>
  </section>
</section>

<div class="print-page-break"></div>
<hr class="no-print">

<section class="sectionLayout sectionLayout--work">
  <header>
    <h2>工作经历</h2>
  </header>
  <section class="sectionLayout">
    <header>
      <h3>上海览益信息科技有限公司（ 2016年5月 ~ 至今 ）</h3>
    </header>
    <p>公司的前端团队由一个人(我)发展到现在的5个人。目前我是前端团队的负责人，负责基础设施建设和任务分配，致力于提高团队成员素质。</p>

    <section class="sectionLayout">
      <h4>览益财经</h4>
      <p>览益财经是一个注重 SEO 的财经资讯类多页面站点。采用传统的前端开发 + 后台模板的开发方式。</p>
      <p>在此项目中我通过 nodejs + webpack 构架了一个多页面构建系统，充分利用现代 javascript 的模块性和语法。支持单次多页面本地开发和多页面打包，以及 css 和 js 的预打包。集成了 eslint 检验代码，prettier 格式化代码，确保统一的代码风格。基础开发流程为：cli生成页面模板（pc, moblie, hybird, responsive 四选一） -> 本地开发 -> 打包 -> 自动交付给后台。</p>
      <p>使用 scss 作为 css 预处理器，使用 BEM + functional css 作为 css 规范。一开始是单纯的 BEM，后面遇到 BEM 的通病：复用率低，因此采用了 BEM + functional css 的行式，极大提高了 css 复用和开发效率。一开始通用类的定义遍布多个文件，后面利用 scss 实现了一个通过解析对象模型输出通用 css 的功能，缩减了大量 css, 集中的定义方式也使其方便查找和修改，</p>
      <p>连同客户端开发了自己的 jsbridge 实现，定了相应的通信，调用协议来作为 hybird 开发的解决方案。</p>
      <p>面临的最大的挑战在于如何组织这么一个巨型多页代码库。幸运的是开源社区内有很多优秀的工具，借助 webpack + node.js，建立起了一套工程化的构建系统，解决了组件共享，css/js 库预打包，开发到递交等诸多痛点，将开发一个新页面的关注点限制在页面自身范围内。当然也有工具不能解决的问题，我们可以使用工具来实现组件共享，但没法阻止低质量的组件产生，比如过早抽象出来的组件，这种组件往往 api 不够灵活或有缺陷。当这种组件被滥用后，是很难从代码库中彻底移除的。还有代码中常见的问题，像 css 中 margin collapse 问题，就可以通过约定只使用 margin-top 来避免（其实可以使用 styelint 来强制，只是我目前还没集成进来）。这类问题当前是通过制定约定，人工审查来避免的。</p>

      <h4>内部系统+</h4>
      <p>在为公司内部开发系统的的时候，主要采用 react + redux + react-router 的技术栈做成 SPA.不过有一个例外，使用了 vue 系列开发一个类微信的 im 系统，这主要是因为当时公司内缺乏 react 人才。这类项目的组织是我参照 product hunt 网站的 react 实践进行进行总结的符合我们需求的可行实践。</p>

      <h4>运营推广页面解决方案</h4>
      <p>使用了 react 技术栈 + electron 开发了一款桌面 GUI 程序使 “开发 -> cdn 分发 -> 部署” 一体化。</p>
    </section> 
  </section>

  <section class="sectionLayout sectionLayout--work">
    <header>
      <h3>广西云峰信息科技有限公司（ 2015年5月 ~ 2016年5月）</h3>
    </header>
    <p>广西云峰信息科技有限公司是一家致力为他人提供 BI 服务的公司，在职期间担任后端 java 开发工程师。</p>
    <section class="sectionLayout">
      <h4>数据业务系统</h4>
      <p>技术栈使用 spring + springMVC + hibernate。 主要功能：创建编辑数据元数据，生成数据录入和检索表单，数据可视化。</p>
      <p>在此期间深读了 spring 以及相关库的文档，对 DI 和 ORM 等概念有了深刻认识。同时独立开发了一个由 xml 文件生成表格的中间件。生成的表格本身只作为数据模型，在此之上实现了 html 和 excel 两个前端输出组件。具体逻辑: parse xml -> 数据字段和聚合关系 -> 生成 sql -> 使用相应的数据库后端查询 -> 转换为抽象表格数据模型 -> 前端渲染</p>
    </section>
  </section>
</section>
