# **CSS**

## **盒子模型**

### **组成**

从内到外依次为 content、padding、border、margin

### **标准盒模型（content-box**）

宽高=content

### **IE**盒模型（**border-box）**

宽高=content+padding+border

### **四种获取盒子模型宽高的方式**

```js
// 只能取到行内样式的宽和高，style 标签中和 link 外链的样式取不到
const { width, height } = dom.style;

// 取到的是最终渲染后的宽和高，只有 IE 支持此属性
const { width, height } = dom.currentStyle;

// 取到的是最终渲染后的宽和高，大部浏览器支持（常用）
const { width, height } = window.getComputedStyle(dom);

// 取到的是最终渲染后的宽和高，大部浏览器支持
const { width, height } = dom.getBoundingClientRect();
```

### **BFC**环境

#### 含义

BFC 全称为「Block Formatting Context」，即块级格式上下文。它是 CSS 布局中一个比较重要的概念，指的是一个独立的渲染区域，其中的元素按照一定规则进行布局和渲染。

#### 作用

BFC 环境的出现主要是为了解决浮动元素导致的布局问题，因为浮动元素往往会导致父元素的高度丧失，使得其子元素无法正常布局。

#### 特性

1. 内部的元素不会影响外部布局，即 BFC 内部的元素不会影响到外部元素的位置和大小。
2. 相邻的块级元素会垂直排列，即 BFC 内部的块级元素会按照垂直方向依次排列，并且相邻元素之间的 margin 会得到正确的处理。
3. 计算 BFC 的高度时，浮动元素也会参与计算，即 BFC 会包含其所有子元素的高度，包括浮动元素的高度。

#### 触发方式

1. float 属性：当元素设置了 float 属性值为 left 或 right 时，会创建一个新的 BFC 环境。
2. position 属性：当元素设置了 position 属性值为 absolute 或 fixed 时，会创建一个新的 BFC 环境。
3. display 属性：当元素设置了 display 属性值为 inline-block、table-cell、table-caption、flex、inline-flex 等时，会创建一个新的 BFC 环境。
4. overflow 属性：当元素设置了 overflow 属性值不为 visible 时，会创建一个新的 BFC 环境。

除了上述方式，还可以通过在父元素中插入一个空元素并设置 clear 属性来手动触发 BFC。

#### 举例说明

高度塌陷问题

```html
<div class="parent">
  <div class="child1">普通子元素</div>
  <div class="child2">浮动子元素</div>
</div>
```

```css
.child1 {
  height: 50px;
  margin-bottom: 20px;
  border: 1px solid aqua;
}

.child2 {
  float: left;
  height: 100px;
  margin-left: 20px;
  border: 1px solid red;
}

.parent {
  border: 1px solid yellow;
}
```

此时，由于元素浮动，浮动子元素脱离了父容器，导致父容器的高度无法自适应内容，形成了一个不希望出现的效果。

为了解决这个问题，我们可以使用 BFC 触发机制，将父容器触发 BFC 环境，从而创建一个独立的渲染区域，使得其子元素可以按照我们期望的方式进行布局。

具体的实现方式是，将父容器的 overflow 属性设置为任意一个值，比如 hidden，这时父容器就会创建一个新的 BFC 环境，如下所示：

```css
.parent {
  border: 1px solid yellow;
  overflow: hidden; /* 触发 BFC */
}
```

这时，父容器将会按照我们期望的方式进行布局，浮动子元素没有脱离父容器，而是按照正常的方式进行布局。

上述例子中，我们通过将父容器触发 BFC 环境来解决了浮动元素导致的高度塌陷问题。

需要注意的是，在实际开发中，我们需要根据具体场景进行灵活的选择，选择最适合当前布局的方案来解决问题。

## **四种**CSS**盒子水平垂直居中方式**

### flex 弹性布局

```css
 {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 定位+margin:auto

```css
.child {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.parent {
  width: 500px;
  height: 500px;
  position: relative;
}
```

### 定位+负 margin

```css
.child1 {
  width: 100px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px; /* 盒子宽度的一半 */
  margin-top: -100px; /* 盒子高度的一半 */
}

.parent {
  width: 500px;
  height: 500px;
  position: relative;
}
```

### 定位+transform

```css
.child1 {
  width: 100px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50px, -100px);
}

.parent {
  width: 500px;
  height: 500px;
  position: relative;
}
```

## **七种常见的 css 选择器/样式**

### id

```css
#myDiv {
  color: red;
}
```

### class

```css
.myClass {
  font-size: 14px;
}
```

### 属性

```css
.myClass[class='myClass'] {
  color: red;
}

a[href*='example.com'] {
  font-weight: bold;
}
```

### 行内

```css
<div style="color: blue;">这里是行内文本</div>
```

### 标签

```css
p {
  font-weight: bold;
}
```

### 通配符

```css
* {
  border: 1px solid red;
}
```

### 伪类

```css
a:hover {
  color: green;
}
```

优先级关系：行内 > id > class/属性/伪类 > 标签 > 通配符

## **CSS3 新增**

### 圆角

```css
border-radius: 10px;
```

### 阴影

```css
box-shadow: 2px 2px 5px 2px silver;
```

### 颜色渐变

```css
/* 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向 */
background-image: linear-gradient(to bottom, red, blue);

/* 径向渐变（Radial Gradients）- 由它们的中心定义 */
background-image: radial-gradient(circle, red, blue);
```

### 文本超出显示

```css
// 超出显示省略号
text-overflow: ellipsis;
```

### 允许长文本换行

```css
word-wrap: break-word;
```

### 单词拆分换行

```css
word-break: break-all;
```

### 多媒体查询（@media）

```css
@media (max-width: 1920px) {
  html {
    font-size: 16px;
  }
}

@media (max-width: 1500px) {
  html {
    font-size: 14px;
  }
}
```

### transform 系列

```css
/* 平移, 第一个参数：x轴，正数向右移动，负数向左移动；第二个参数：y轴，正数向下移动，负数向上移动 */
transform: translate(50px, 100px);
transform: translate(-50px, -100px);

/* 缩放n倍 */
transform: scale(0.5);
transform: scale(2);

/* 旋转，正数顺时针，负数逆时针 */
transform: rotate(30deg);
transform: rotate(-30deg);
```

### 动画（animation）

```css
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* infinite表示动画不停止 */
.div {
  animation: rotate 2s linear infinite;
}
```

### 过渡效果（transition）

```css
.link {
  color: #0969da;
  transition: all 0.5s ease;

  &:hover {
    color: #69b1ff;
  }
}
```

### flex 布局

```css
.div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

## 基于 CSS-in-JS 模式的 CSS 框架

### Styled components

```javascript
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => (props.primary ? 'blue' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border: 1px solid blue;
  border-radius: 3px;
`;

// 在组件中使用该 Button
<Button primary>Click me</Button>;
```

### CSS Modules（推荐）

```css
/* styles.css */
.btn {
  background-color: white;
  color: black;
  border: 1px solid blue;
  border-radius: 3px;
}
```

```javascript
// 在组件中引用该样式表
import styles from './styles.css';

function Button() {
  return <button className={styles.btn}>Click me</button>;
}
```

### Styled JSX

```javascript
function Button() {
  return (
    <button>
      Click me
      <style jsx>{`
        button {
          background-color: white;
          color: black;
          border: 1px solid blue;
          border-radius: 3px;
        }
      `}</style>
    </button>
  );
}
```

## **CSS**框架

Bootstrap、Tailwind CSS
