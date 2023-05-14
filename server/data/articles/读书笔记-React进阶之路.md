# React 进阶之路

1.一般无状态使用函数组件，有状态使用类组件，函数组件比较简洁。

2.定义少量有状态组件管理整个应用的状态变化和逻辑处理，并通过 props 传递给无状态组件完成 Ui 渲染。

3.可以给函数组件设置属性校验 PropTypes 和默认属性 defaultProps

4.组件样式引入方式：
4.1.外部样式表
link 标签引用（基础样式）和 import 模块导入（组件私有样式）
4.2.内联样式
Style 的方式

5.CSS Modules---样式重名解决方案。

6.React 事件
6.1.React 的 event 被称为合成事件，它和 DOM 原生事件的区别：
React 合成事件有自己的一套机制，所有事件统一在 document 处监听，当事件发生并冒泡至 document，被 document 监听到后，React 将事件封装给中间层 SyntheticEvent 去处理。
备注：原生事件更快。
6.2.初始化的 react 项目会自动开启 ES7 实验性语法---属性初始化语法，所以在绑定事件时不需要 bind。

7.表单组件
7.1.受控组件可以通过 state 去修改 value
7.2.非受控组件通过 ref 获取 value，defaultValue 和 defaultChecked 设置默认值及更新该值。
备注：一般情况下建议使用受控组件，使用状态管理元素的值。

React16 新特性

8.Render 返回类型：元素数组 ListComp 和字符串 StringComp

9.React 错误处理机制
情况一：16 版本之前，组件报错整个应用会显示空白
情况二：16 版本引入错误机制，当组件抛出错误时，该组件会从组件树中卸载
情况三：错误边界 componentDidCatch---优雅的给出错误日志或提示不会卸载。

10.Portals 可以将 React 元素渲染到任意 DOM 节点下

11.支持自定义 DOM 属性

12.创建合适的 state
要把 state 当做不可变对象
原则一：不是通过其他状态计算得到的中间状态
原则二：不是通过 props 获取
原则三：在组件的整个生命周期中有过变化（不是普通属性）
原则四：在 render 中使用到

13.更新 state
直接更新或函数更新

14.通信方式
14.1.层级较深的组件通信 Context
a.创建：使用 getChildContext 返回一个对象，使用类名.childContextTypes 的方式定义属性的类型
b.调用：this.context.属性名

14.2.引入 EventEmitter 或 Postal.js 等消息队列库实现观察者模式

15.只能为类组件或 Dom 元素定义 ref，不能给函数组件定义 ref

16.Diff 算法
原则 1：两个元素类型不同，将生成两个不同的树
原则 2：一个元素有多个孩子元素时，对比 key 进行更新属性

17.性能优化
优化一：使用生产环境的库：npm run start 使用的开发环境的 React 库，npm run build 使用的生产环境的 React 库，如果自己编写的 webpack，需要将环境变量 NODE_ENV 改为 production

优化二：避免不必要的组件渲染
a.每个有状态的组件都要去思考 shouldComponentUpdate 的返回值
b.继承 React.PureComponent 可自动浅比较 props 和 state，前提是要把 state 当做一个不可变对象

优化三：使用 key

18.性能检测工具
why-did-you-update 比较组件 state 和 props 变化，从而发现 render 方法是否必要

19.高阶组件
两种方式：代理和继承，继承会有侵入性。
注意事项： 1.为了区分包装了不同组件的高阶组件，使用 static displayName 把被包装组件的名称也包到高阶组件中 2.高阶组件最适合使用的地方是组件定义的外部 3.静态方法需要手动复制，高阶组件不会带上包装组件的静态方法
4.refs 不会被传给被包装的组件。 5.与父组件的差别在于，高阶组件是一个函数，函数关注的是逻辑，而组件关注的是 UI/DOM

20.单页面应用和多页面应用
单页面应用：url 的变化不会重新请求服务器
多页面应用：一个 url 对应一个 html 问号，每次切换页面，都会改变 url 重新请求服务器，这样就会造成了静态资源的浪费。

21.React-Router 1.先配置路由器 Router，分为两种，BrowserRouter 和 HashRouter。浏览器路由（http://hiCode/topo ）是真实路径，服务器必须返回对应路径的页面，哈希路由（http://hiCode/#/topo ）是虚拟路径，#号前面是规定的，始终对应一个页面。 2.配置路由 Route，配置路由的 path 匹配 url 渲染相应的组件

Route 组件属性
component
render
children 不管是否匹配，都会被渲染
Switch 匹配到多个路由时，只执行第一个
exact 完全匹配时才渲染
