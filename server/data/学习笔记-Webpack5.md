# **Webpack5**

## **含义**

静态资源打包器，打包 js、html、css 生成 bundle，依赖 nodejs 的 commonjs 模块化

## **核心**

### **entry（入口）**

作用：指定 webpack 从哪个文件开始打包

### **output（输出）**

作用：指定 webpack 打包完的文件输出到哪里

### **loader（加载器）**

**角色：翻译官**

**作用：将**webpack**不识别的内容翻译为能识别的内容，帮助 webpack**解析除 js、 json**外的其他资源（**css**、less**、sass**等）**

#### 分类

- preloaders：在其他 loader 调用前做 **代码检查**
- loaders：做 **代码转换** ，例如：将 less 转换为 css
- postloaders：在调用 loader 之后需要调用的 loader，例如：代码覆盖率自动化测试

#### 常用 loaders

- style-loader：把 CSS 以 \<style\>\</style\> 标签内嵌的形式插入到 DOM 中
- css-loader：解析@import 和 url（）语法，支持配置 sourceMap
- less-loader：将 Less 编译为 CSS
- sass-loader：将 Sass/SCSS 编译为 CSS
- stylus-loader：将 Stylus 文件编译为 CSS
- postcss-loader：使用 PostCSS 处理 CSS，提高浏览器兼容性
- babel-loader：使用 Babel 解析 ES6 语法
- html-loader：将 HTML 导出为字符串

### **plugins（插件）**

**角色：老师**

**作用：给**webpack**赋能各种新知识来扩展**webpack**的能力**

#### 常用 plugins

- EslintWebpackPlugin：该插件使用 eslint 来查找和修复 JavaScript 代码中的问题
- HtmlWebpackPlugin：该插件将为你生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
- MiniCssExtractPlugin：可替代 style-loader，将 CSS 提取到单独的文件中，实现异步加载

### **mode（编译模式）**

作用：指定 webpack 以什么模式编译

#### 两种模式

开发模式（development）：编译 ES6 模块化语法

生产模式（production）：编译 ES6 模块化语法，压缩 js 代码

### **devServer**

自动编译打包，创建一个 dev 服务器监听 src 目录，src 目录有变更则重新打包代码，没有输出，所以不用配置 clean，支持热模块替换（仅支持 CSS），JS 需要引入 react-hot-loader。

### **devTool（sourceMap）**

支持源文件映射，方便调试

## **作用**

- 编译 ES Module 语法；
- 压缩 JS 代码
- 处理 Less、Sass、Styl 等 css 语法
- 集成 Eslint 来做代码质量检查
- 为兼容 IE 等浏览器，集成 babel 来解析 ES6 以上语法
- 管理打包目录结构
- 将小图片转 Base64，减少图片请求数量
- 自动清空上次打包
- 处理字体、图标、音频、视频等资源
- 提取 CSS 为单独文件
- 处理 CSS 兼容性
- 压缩 CSS 代码

## **Runtime**

webpack 的 runtime，也就是 webpack 最后生成的代码，做了以下三件事:

1. \_\_webpack_modules\_\_: 维护一个所有模块的数组。将入口模块解析为 AST，根据 AST 深度优先搜索所有的模块，并构建出这个模块数组。每个模块都由一个包裹函数(module, module.exports, **webpack_require**) 对模块进行包裹构成。
2. **webpack_require**(moduleId): 手动实现加载一个模块。对已加载过的模块进行缓存，对未加载过的模块，执行 id 定位到**webpack_modules** 中的包裹函数，执行并返回 module.exports，并缓存
3. **webpack_require**(0): 运行第一个模块，即运行入口模块

摘录：[https://q.shanyue.tech/engineering/729.html#webpack-runtime](https://q.shanyue.tech/engineering/729.html#webpack-runtime)

## **性能优化**

### 提升开发体验

- SourceMap：生成源文件与构建文件的映射，方便调试。

### 提升打包构建速度

- HMR：开发模式下增量更新，模块热替换，代码变更仅重新打包修改文件；
- ReactHMR：需要在 loader 的 babel 里设置 plugins 为 react-refresh，然后在 plugins 里面 new 调用一下。
- OneOf：loader 的正则匹配仅匹配一次
- Include/Exclude：babel 或 Eslint 仅处理包含/不处理排除的文件；
- Cache：Babel 和 Eslint 开启缓存，缓存上一次 Eslint 检查 和 Babel 编译结果，这样第二次打包速度就会更快；
- Thead：多进程打包，打包的文件越大越明显

### 减少代码体积

- TreeShaking：移除 js 中没有被使用的代码（默认开启了这个功能，无需其他配置），但是有些内容无法命中 treeshaking，需要手动添加/\*#\_\_PURE\_\_\*/帮助 webpack 过滤不要的代码
- Babel 去重复引用：使用@babel/plugin-transform-runtime 去掉重复引用的代码编译，如 lodash 的函数引用
- Image Minimizer：压缩图片，分为有损压缩和无损压缩。
- MiniCss：css 单独打包
- cssMInizer：压缩 css 代码

### 优化代码运行性能

- CodeSplit：
  代码分割：多入口打包，处理公共代码
  按需加载：import 动态导入（提升首页渲染速度，比如：路由懒加载），动态命名 ChunkName
- Preload：立即加载资源
- Prefetch：空闲时加载加载
- Network Cache：
- contenthash：由于浏览器会读取缓存文件，当项目版本更新，浏览器无法识别新文件，需要使用 contenthash 来根据文件内容的改变从而改变文件名
- runtime：当某个文件内容更新会导致顶层引用文件一系列的更新，所以需要使用 runtime 缓存文件 hash 值，这样就只会更新修改文件和 runtime 文件，从而提升文件加载速度
- Core-js：自动引入 ES6 以上兼容性语法，如 Promise、includes 等
- PWA（渐进式网络应用）：离线缓存，断网可用
- cacheGroups：大文件拆分打包成 chunk 并行加载
- performance：false 关闭性能分析，提升打包速度
