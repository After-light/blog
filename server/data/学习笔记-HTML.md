# HTML

## 含义

超文本标记语言，用来设计和编辑网页

## 语法

一个 HTML 标签由开始标签、属性、内容和结束标签组成，标签的名称不区分大小写，但大多数属性的值需要区分大小写。

## HTML 引入 CSS 的四种方式

行内样式（标签上直接写样式）、内嵌样式（Style 标签包裹）、link 链接、导入样式（样式文件中使用@import 导入）。

## HTML 元素分类

### 块级元素（block）

div、p、form、table、h1-h6、dl、dt、dd、ul、ol

### 行内元素（inline）

span、a、label、var、strong（强调&加粗）、b（加粗）、em（强调&斜体）、i（斜体）

### 行内块级元素（inline-block）

input、img

## H5 新特性

### 布局标签

header、nav、section、article、aside、footer、details、summary

### 自定义标签

默认为行内元素

### canvas 标签

支持 2D/3D 绘图

```javascript
var mycanvas = document.getElementById('canvas');
var context = mycanvas.getContext('2d');
```

### MathML 标签

支持展示数学符号和公式

### drag 和 drop 标签支持元素的拖/放，给元素添加 draggable="true"书写可设置元素为可拖放

### 地理定位

通过 navigator.geolocation.getCurrentPosition 函数获取用户的地理位置

### video 标签

支持视频的展示

### audio 标签

支持音频的展示

### 新增 input 类型

color（选色板）

date（日期选择器）

datetime（？？）

datetime-local（日期&时间选择器）

email（自动验证邮箱）

month（月份选择器）

number（数值选择器）

range（范围滑动条）

search（带删除的搜索框）

tel（定义输入电话号码字段）

time（时间控制器）

url（自动验证网址）

week（周&年选择器）

### 自动完成

使用 input 和 datalist 标签结合使用

### Web 存储

localStorage（长久存储）和 sessionStorage（会话存储）

### Web SQL 数据库

关系型数据库，已废弃

### 应用程序缓存

在 html 标签中增加 manifest 属性

### Web Workers

浏览器提供的 js 多线程解决方案，旨在解决复杂、耗时的运算达到释放主进程的目的

### 服务器发送事件（service-sent-event）

服务器向浏览器推送消息，已达到更新数据的目的。

var evtSource = new EventSource('sse.php');

evtSource.onopen = function() {}

evtSource.onmessage = function(e) {}

### WebSocket

建立在 TCP 连接上的协议，使得客户端与服务器之间持久的连接，并进行双向数据传输。
