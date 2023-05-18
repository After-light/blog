# **React-Router**

## **概念**

将 url 与函数或组件匹配，构建一个映射到 URL 的完整用户界面。

## **作用**

1. 订阅和操作历史记录
2. 将 URL 和路由匹配
3. 从路由匹配中渲染嵌套 UI

## **路由关键词**

### URL

地址栏中的 URL

### Location

它代表"用户在哪里"

### History

它允许 React Router 订阅 URL 中的更改，并提供 API 以编程方式操作浏览器历史堆栈（pop/push/replace）

## **路由分类**

### BrowserRouter

基于 H5 的 History 实现页面 URL 与 UI 同步，URL 直接拼接路径

### HashRouter

基于 window.Location.hash 实现页面 URL 与 UI 同步，URL 拼接/#+路径也就是锚点的形式实现路由

### HistoryRouter

帮助我们手动传入 history 实例

### MemoryRouter

用于 RN

### NativeRouter

基于 MemoryRouter 的封装

## **react-router5.x**和 6.x 的区别

内置语法变化：移除 \<Switch /\> ，新增了\<Routes /\>

语法的变化：component={\<Home /\>} 改成了 element={\<Home /\>}

新增了多个 hook：useParams、useSearchParams、useNavigate

## **路由切换时的**Action

pop：刷新当前页面

push：打开新的路由（追加式），支持回退、前进

replace：打开新的路由（覆盖式），不支持回退、前进

## **动态路由的三种方式**

### **params**

```javascript
// 定义路由链接（携带参数）
<Link to={`/home/${id}`} />

// 配置路由跳转（声明接收）
<Routes>
  <Route path='/home/:id' element={<Home />}></Route>
</Routes>


/**
* 获取动态参数
* 1.通过 useParams 获取
*/
const { id } = useParams();


/**
* 获取动态参数
* 2.通过 useMatch 获取
*/
const { params: { id } } = useMatch('/home/:id');
```

### **search**

```javascript
// 定义路由链接（携带参数）
<Link to={`/home/?id=${id}`} />

// 配置路由跳转（无需声明）
<Routes>
  <Route path='/home' element={<Home />}></Route>
</Routes>

/**
* 获取动态参数
* 1.通过 useSearchParams 获取
*/
const [searchParams, setSearchParams] = useSearchParams();
const id = searchParams.get('id');

/**
* 获取动态参数
* 2.通过 useLocation 获取（注意如果参数值为中文则需要转码）
*/
const { search: { id } } = useLocation();
```

### **state**

```javascript
// 定义路由链接（携带参数）
<Link to='/home' state={{ id }} />

// 配置路由跳转（无需声明）
<Routes>
  <Route path='/home' element={<Home />}></Route>
</Routes>

/**
* 获取动态参数
*/
const { state: { id } } = useLocation();
```

## **常用路由标签**

### Link（路由链接）

`<Link to="/home" />`

### NavLink（高亮路由）

`<NavLink to="/home" className={({ isActive }) => isActive ? activeClass : class } />`

### Navigate（重定向）

渲染时触发路由跳转，`<Navigate to={"/home"} replace={true} />`

### Outlet

当产生嵌套路由时，需要配置 Outle 来完成子路由组件的渲染，子路由组件在 Outlet 所在位置渲染，`<Outlet />`

### Route

定义路由匹配路径并指定跳转到的组件，`<Route path="/home" element={<Home />} />`

### Routes

Route 必须包裹在 Routes 里面才能生效，`<Routes><Route path="/home" element={<Home />} /></Routes>`

## **常用路由**Hook

### useRotes

根据路由表创建嵌套路由，动态生成\<Routes /\>和\<Route /\>

### useNavigate

返回一个函数实现编程式导航

### useParams

返回当前路由匹配到的参数

### useSearchParams

用于读取和修改当前位置的 URL 中查询的参数

### useLocation

获取当前 location 信息

### useMatch

返回当前路由匹配到的信息
