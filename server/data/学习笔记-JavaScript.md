# **JavaScript**

## **数据类型**

数据类型分为基本数据类型和引用数据类型

基本数据类型：Number、String、Boolean、Undefine、Null、Symbol、BigInt

引用数据类型：Object（function、array、object）

### **两种数据类型的区别**

#### **存储位置**

- 基本数据类型：占据的空间固定，所以存储在栈（stack）中，便于查寻变量的值。
- 引用数据类型：占据的空间不固定，所以存储在堆（heap）中，但为了提高查询效率，将其引用地址存于栈（stack）中。

#### **拷贝**

- 基本数据类型：生成一个新的变量，两个变量完全独立
- 引用数据类型： **浅拷贝** ，生成一个新的引用地址，两个引用地址都指向同一个内存堆中的变量； **深拷贝，** 在堆中生成一个新的变量，并生成一个新的引用地址

#### **传参**

- 基本数据类型：值传递（修改形参不会影响实参）
- 引用数据类型：引用传递（修改形参会影响实参）

### **数据类型转换**

#### **强制转换**

##### **Number**

第一步：调用对象自身的 valueOf 方法，如果返回值是原始类型，则对该值使用 Number 函数且不再继续；若返回值为对象，继续下一步。

第二步：调用对象自身的 toString 方法，如果返回值是原始类型，则对该值使用 Number 函数且不再继续；若返回值为对象，则报错。

```javascript
// 原始类型
Number(12); // 12
Number('12'); // 12
Number('123asd'); // NaN
Number(''); // 0
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); // NaN

// 对象类型
Number({ name: 'xiaoli' }); // NaN
Number([1, 2, 3]); // NaN
Number([1]); // 1
Number({
  valueOf: function () {
    return {};
  },
  toString: function () {
    return {};
  },
}); // 报错
```

##### **String**

第一步：调用对象自身的 toString 方法，如果返回值是原始类型，则对该值使用 String 函数且不再继续；若返回值为对象，则继续下一步；

第二步：调用对象自身的 valueOf 方法，如果返回值是原始类型，则对该值使用 String 函数且不再继续；若返回值为对象，则报错。

```javascript
// 原始类型
String(1); // '1'
String('abc'); // 'abc'
String(true); // 'true'
String(null); // 'null'
String(undefined); // 'undefined'

// 对象
String({ name: 'lirui' }); // '[object Object]'
String([1, 2]); // '1,2'
String([{ name: 'lirui' }]); // '[object Object]'
Sting({
  toString: function () {
    return {};
  },
  valueOf: function () {
    return {};
  },
}); // 报错
```

##### **Boolean**

除了五个值转换为 false，其他均为 true

```javascript
Boolean(undefined); // false
Boolean(null); // false
Boolean(''); // false
Boolean(0); // false
Boolean(NaN); // false
```

#### **自动转换**

预期什么类型的值，就调用该类型的转换函数。

场景一：自动转字符串：当一个值为字符串，另个一个值为非字符串，则预期值为字符串。

```javascript
// 规则 1：先将复合类型转换为原始类型，再将原始类型转换成字符串。
// 规则 2：+、-、\*、/在非同类型计算时，非预期值类型都用使用**Number()**强制转换。
123 + 'abc'; // '123abc'
var obj = {
  toString: function () {
    console.log(1);
    return 1;
  },
  valueOf: function () {
    console.info(2);
    return {};
  },
};
'1' + obj; // '11' 结果解释：Number(obj) ---\> obj.valueOf() ---\> obj.toString()
```

场景二：自动转布尔值

```javascript
// if 判断
if ('abc') {
  console.log(123);
}

// 三元运算符
a ? 1 : 0;

// 取反!
!!a;
```

## **原型和原型链**

显式原型：每个函数的 prototype 属性

隐式原型：每个实例对象的\_\_proto\_\_属性

### **特性**

特性 1：构造函数的原型对象上的 constructor 指向构造函数，即 Fn.prototype.constructor === Fn

特性 2：根据构造函数生成的实例对象的\_\_proto\_\_指向构造函数的原型，即 new Fn(). **proto** === Fn.prototype

### **继承**

```javascript
// 首先声明一个公共父类，为以下代码提供基础
function Person() {
  this.name = 1;
  this.age = [1, 2, 3];

  // 实例方法
  this.getName = function () {
    return this.name;
  };
}

// 原型方法
Person.prototype.getAge = function () {
  return this.age;
};
```

#### **原型链继承**

```javascript
function Man() {
  this.sex = 'man';
}

Man.prototype = new Person();
var a = new Man();
var b = new Man();

a.age.push(4);
console.info(a.age, b.age);

a.proto.name = 2;
console.info(a.name, b.name);
```

**核心** ：将父类的实例作为子类的原型

**缺点** ：

- 两个实例使用的同一个原型对象，内存空间是共享的，所以一个改变另一个也会改变；
- 创建子类实例时，无法向父类构造函数传参
- 无法实现多继承

#### **构造函数继承**

```javascript
function Woman() {
  Person.call(this);
  this.sex = 'woman';
}

var woman1 = new Woman();
var woman2 = new Woman();

console.info(woman1, woman2);
console.info(woman1 instanceof Person); // false
```

**核心** ：使用父类的构造函数来增强子类，等于复制父类的实例属性给子类

**缺点** ：

- 每个子类都有父类实例函数的副本，影响性能
- 无法继承父类的原型属性

#### **实例继承**

```javascript
function Father() {
  var person = new Person();
  person.age = 45;

  return person;
}
```

**核心** ：为父类实例添加新特性，作为子类实例返回

**缺点** ：

- 实例是父类的实例，不是子类的实例
- 不支持多继承

#### **拷贝继承**

```javascript
function Mather(name) {
  var person = new Person();

  for (var p in person) {
    Mather.prototype[p] = person[p];
  }

  this.name = name || 'Tom';
}

var mather = new Mather();
console.info(mather);
```

**核心** ：将父类的实例属性赋值给子类的原型

**缺点** ：

- 父类的原型属性没有复制
- 效率较低，内存占用高

#### **组合继承**

```javascript
function Teacher() {
  Person.call(this);

  this.age = 25;
}

Teacher.prototype = new Person();
var teacher = new Teacher();

console.info(teacher);
```

**核心** ：继承父类的属性+支持多继承&传参+绑定父类实例作为子类原型

**缺点** ：调用了两次父类的构造函数，生成了两份实例

#### **寄生组合继承（extends）**

```javascript
function Student(age) {
  Person.call(this); // 继承父类属性

  this.age = age || 12;
}

// 这里是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
(function () {
  var Base = function () {};
  Base.prototype = Person.prototype; // Base 的原型指向 Person
  Student.prototype = new Base(); // Student 的原型指向 Base
  Student.prototype.constructor = Student; // 重新将构造函数指向自己，修正构造函数
})();

var student = new Student();
console.info(student);
```

**核心** ：继承父类的属性+支持多继承&传参+生成一个没有实例属性&方法的类，将父类的原型赋值给该类，用该类生成一个新实例作为子类原型

**缺点** ：实现较为复杂

### **new 一个对象的过程**

例如：var a = new A();

1. 创建一个空对象 a = {};
2. 连接原型：将新对象的**proto**连接到构造函数的原型 a.\_\_proto = A.prototype
3. 执行构造函数并绑定 this 到新对象上
4. 返回新对象

## **执行环境**

### **this**

#### 使用场景

场景 1、全局作用域或者普通函数自执行中 this 指向全局对象 window

场景 2、函数中在严格模式下，this 指向 undefined

场景 3、对象函数中 this 指向调用者

场景 4、在事件绑定中，this 指向事件源

场景 5、构造函数里的 this,指向创建出来的实例

场景 6、setTimeout/setInterval 中的 this 指向 window

#### **改变 this 指向的方式**

bind：参数个数不限，第一个参数是 this 指向的对象，返回值是函数，需要手动调用执行。

call：参数个数不限，第一个参数是 this 指向的对象，直接执行，性能比 apply 更好，因为不用解析数组

apply：只有两个参数，第一个参数是 this 指向的对象，第二个参数是数组，直接执行

箭头函数：this 指向距离最近的作用域中的 this

### **闭包**

引用了另一个函数作用域中变量的函数，通常是嵌套函数中实现

```javascript
function a() {
  var a = 1;

  return function b() {
    return a;
  };
}

a()();
```

### **作用域和作用域链**

**全局作用域** ：作用于所有代码执行的环境

**局部作用域** ：作用于函数内的代码环境

**作用域链** ：允许当前作用域访问父级作用域/全局作用域的数据。

### **上下文**

#### **执行上下文栈（调用栈）**

执行所有代码的栈，英文 Execution Context Stack（ECS）

#### **全局执行栈**

为了执行全局代码构建的栈，英文 Global Execution Context（GEC）

**工作** ：创建全局对象 Global Object（GO）

**GO 对象的特性**

特性 1、该对象 所有的作用域（scope）都可以访问；

特性 2、里面会包含 Date、Array、String、Number、setTimeout、setInterval 等等；

特性 3、其中还有一个 window 属性指向自己

#### **函数执行上下文**

为了执行函数体构建的栈，Functional Execution Context–简称 FEC

**工作** ：

1. 创建

```markdown
a. 生成变量对象 Variable Object（VO）
特性 1、var 声明的变量或函数不在 VO 中
特性 2、一个函数执行上下文包含多个 VO，其中包括全局上下文 VO 和函数上下文 VO
b. 建立作用域链
c. 确定 this 指向
```

2. 入栈执行

```markdown
a. 函数执行上下文中，VO 是不能直接访问，所以需要创建活动对象 Activation Object（AO），
AO===VO，并添加了形参对象。
b. 变量赋值
c. 函数调用
d. 执行其他代码
```

3. 出栈回收

```markdown
上下文出栈，等待虚拟机回收，全局执行上下文在栈底只有当浏览器关闭才会出栈
```

#### **eval**执行上下文

不推荐使用

## **事件循环**

事件循环又称消息循环，是浏览器渲染主线程的工作方式。

在 Chrome 浏览器中，主线程会开启一个不会结束的 for 循环去消息队列中取第一个任务执行，其他线程执行完后将回调函数包装成一个任务丢到消息队列中。

根据 W3C 官方解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，微队列优先级最高，必须优先调用。

### 消息队列

微队列：用户存放需要最快执行的任务，优先级【最高】

交互队列：用于存放用户操作后产生的事件回调任务，优先级【高】

延时队列：用户存放计时器到达后回调任务，优先级【中】

注意：其他线程在执行延时任务时，会等计时器计时完成后再将回调任务丢到延时队列中。

### 使用场景

- 定时器
- 异步请求和回调函数
- 用户交互事件（如点击、滚动、拖拽等）
- Web Worker

### 经典例题

#### 例一：全局执行环境+promise

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve('success');
});

promise1.then(() => {
  console.log(3);
});

console.log(4);
```

解析：

首先，执行此代码的前四行，控制台会打印出 1，然后 promise1 就会变成 resolved 状态。

然后，开始执行 promise1.then(() =\> {console.log(3);}); 片段。因为 promise1 现在处于已解决状态，所以 () =\> {console.log(3);} 将立即添加到微任务队列中，我们知道 () =\> {console.log(3);} 是一个微任务，所以它不会立即被调用。

然后，执行最后一行代码（console.log(4);)，并在控制台打印 4。

至此，所有同步的代码，即当前的宏任务，都被执行了，那么 JavaScript 引擎检查微任务队列并依次执行它们，() =\> {console.log(3);}被执行并在控制台中打印 3。

**结果：**

**1**

**4**

**3**

#### 例二：全局执行环境+promise+promise.then

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
});

promise1.then(() => {
  console.log(3);
});

console.log(4);
```

解析：

这个例子和上一个非常相似，只是在这个例子中，promise1 会一直处于挂起状态，所以 () =\> {console.log(3);} 不会被执行，控制台也不会输出 3,最后控制台依次输出 1 4

结果：

1

4

#### 例三：全局执行环境+多个 promise

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log(1);

  resolve('resolve1');
});

const promise2 = promise1.then((res) => {
  console.log(res);
});

console.log('promise1:', promise1);
console.log('promise2:', promise2);
```

解析：

首先，前四行代码和之前一样，在控制台打印 1，promise1 的状态是 resolved。

然后，执行 const promise2 = promise1.then(...)，promise 为 fulfilled 状态，所以 res =\> {console.log(res)} 被添加到微任务队列中。同时，promise1.then() 将返回一个新的待处理的 promise 对象。

然后，执行 console.log('promise1:', promise1); ，控制台打印出字符串'promise1'和处于已解决状态的 promise1。

然后，执行 console.log('promise2:', promise2); ，控制台打印出字符串'promise2'和处于挂起状态的 promise2。

至此，所有同步的代码，即当前的宏任务，都被执行了。然后 JavaScript 引擎检查微任务队列并依次执行它们。

res =\> {console.log(res)} 是微任务队列中唯一的任务，现在将被执行。然后控制台将打印 'reslove1' 。

考察知识点：promise 的三种状态：pedding（处理中），fulfilled（已成功），rejected（已失败）

**结果：**

**1**

_promise: <fulfilled_ : resolve1\>

promise2: <_pedding_\>

resolve1

#### 例四：全局执行环境+setTimeout+promise

```javascript
console.log('start');

setTimeout(() => {
  console.log('setTimeout');
});

Promise.resolve().then(() => {
  console.log('resolve');
});

console.log('end');
```

解析：

首先，执行 console.log('start') 并在控制台中打印'start'。

然后，setTimeout 将匿名函数 () =\> { console.log('setTimeout') } 放入宏任务队列。

然后，执行 Promise.resolve()后，promise 处于 fulfilled 状态，所以执行.then 将匿名函数() =\> { console.log('resolve') }放入微任务队列。

然后，执行 console.log('end')，在控制台输出 end。

至此，全局代码（宏任务）执行完毕，检查是否有微任务，找到匿名函数() =\> { console.log('resolve') }，执行并输出 resolve，微任务执行完毕。

最后，检查是否有宏任务，找到匿名函数 () =\> { console.log('setTimeout') } ，执行并输出 setTimeout，宏任务执行完毕。

**结果：**

start

end

resolve

setTimeout

#### 例五：全局执行环境+promise+promise 嵌套 setTimeout

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);

  setTimeout(() => {
    console.log('timerStart');

    resolve('success');

    console.log('timerEnd');
  }, 0);

  console.log(2);
});

promise.then((res) => {
  console.log(res);
});

console.log(4);
```

解析：

首先，开始执行 new Promise(...)，console.log(1)，控制台输出 1。

然后，执行 setTimeout(...)，将匿名函数() =\> { console.log("timerStart"); resolve("success"); console.log("timerEnd"); }放入宏任务队列

然后，执行 console.log(2)，控制台输出 2

然后，执行 promise.then(...)，这时 promise 还没有 resolve，状态还处于 pedding，所以匿名函数(res) =\> { console.log(res); } **没有放入微任务队列**

然后，执行 console.log(4)，控制台输出 4

至此，全局代码（宏任务）执行完毕，检查是否有微任务，没有微任务，检查是否有宏任务，找到宏任务匿名函数() =\> { console.log("timerStart"); resolve("success"); console.log("timerEnd"); }并执行

然后，执行 console.log("timerStart")，控制台输出 timerStart

然后，执行 resolve("success")，promise 的状态变为 fulfilled，then 中的匿名函数被推入微任务队列

然后，执行 console.log("timerEnd")，控制台输出 timerEnd

至此，宏任务执行完毕，开始检查是否有微任务，找到 then 中的匿名函数并执行

最后，控制台输出 success。

**结果：**

**1**

**2**

**4**

timerStart

timerEnd

success

#### **例六：全局执行环境+setTimeout+setTimeout 嵌套 setTimeout**

```javascript
const timer1 = setTimeout(() => {
  console.log('timer1');

  const timer3 = setTimeout(() => {
    console.log('timer3');
  }, 0);
}, 0);

const timer2 = setTimeout(() => {
  console.log('timer2');
}, 0);

console.log('start');
```

**结果：**

start

timer1

timer2

timer3

#### **例七：全局执行环境+setTimeout+setTimeout 嵌套 Promise**

```javascript
const timer1 = setTimeout(() => {
  console.log('timer1');

  const promise1 = Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

const timer2 = setTimeout(() => {
  console.log('timer2');
}, 0);

console.log('start');
```

**结果：**

start

timer1

promise1

timer2

#### **例八：全局执行环境+Promise 嵌套 setTimeout+setTimeout 嵌套 Promise**

```javascript
const promise1 = Promise.resolve().then(() => {
  console.log('promise1');

  const timer2 = setTimeout(() => {
    console.log('timer2');
  }, 0);
});

const timer1 = setTimeout(() => {
  console.log('timer1');

  const promise2 = Promise.resolve().then(() => {
    console.log('promise2');
  });
}, 0);

console.log('start');
```

**结果：**

start

promise1

timer1

promise2

timer2

#### **例九：全局执行环境+Promise 原理+setTimeout+Promise 嵌套 setTimeout**

```javascript
const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

const promise2 = promise1.then(() => {
  throw new Error('error!!!');
});

console.log('promise1', promise1);
console.log('promise2', promise2);

setTimeout(() => {
  console.log('promise1', promise1);
  console.log('promise2', promise2);
}, 2000);
```

解析：

首先，它通过 new Promise(…) 创建了 promise1，它处于 pending 状态。还创建了一个延迟为 1 秒的计时器。

然后，执行 const promise2 = promise1.then(...)，因为 promise1 目前处于 Pending 状态，所以 promise1.then() 的回调函数还不会加入到微任务队列中。

然后，执行 console.log('promise1', promise1) 。此时，promise1 仍处于 Pending 状态。

然后，执行 console.log('promise2', promise2) 。此时，promise2 仍处于 Pending 状态。

然后，执行 const timer2 = setTimeout(…) 。还创建了一个延迟为 2 秒的计时器。

1000 毫秒后，timer1 完成。然后执行 thenresolve('success')，promise1 被解决。

调用 promise1.then(...) 的回调函数，并执行 throw new Error('error!!!')。抛出一个错误，promise2 被拒绝。

又过了 1000 毫秒，timer2 完成。() =\> {console.log('promise1', promise1); console.log('promise2', promise2);} 被执行。

**结果：**

promise1 \<promise pedding\>

promise2 \<promise pedding\>

promise1 \<promise fulfilled: success\>

promise2 \<promise rejected: error!!!\>

## **事件**

### **事件流**

事件冒泡：从内向外（document）触发事件

事件捕获：由 document 向内触发事件，一般不使用

DOM 事件流：事件捕获阶段（document--\>html--\>body）、到达目标阶段、事件冒泡阶段（div--\>body--\>html--\>document）

阻止冒泡：event.stopPropagation

阻止默认行为：event.preventDefault

### **内存和性能**

事件委托：利用事件冒泡，将所有子元素的同一类事件委托给父元素执行。

## **防抖和节流**

### **防抖（debounce**）

在事件被触发 n 秒后再执行回调函数，如果在这 n 秒内又被触发，则重新计时。

**应用场景** ：

- 用户输入触发搜索
- resize、scroll 事件改变窗口大小或滚动时

### 节流（throttling）

规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

**应用场景** ：

- 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次
- 页面加载，滚动到底部再次请求数据时

## ES6 语法

### Promise

Promise 是一种异步编程解决方案，用于处理异步操作和回调函数嵌套过多的问题。Promise 实际上是一个对象，通过该对象可以获取异步操作的结果。Promise 一般包含三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。

### 使用场景

- 处理异步操作，替代回调函数嵌套
- 处理多个异步操作，并发执行
- 处理多个异步操作中的第一个完成的场景
- 错误处理

  ```javascript
  // 实现一个超时请求处理
  function requestWithTimeout(requestPromise, timeout = 5000) {
    const createTimeoutPromise = (timeout) => {
      return new Promise((_, reject) =>
        setTimeout(() => reject(`request timeout after ${timeout}ms`), timeout)
      );
    };

    return Promise.race([requestPromise, createTimeoutPromise(timeout)]).catch((err) => {
      throw new Error(err);
    });
  }

  // Promise.all方法处理多个异步任务并发执行的场景
  const promise1 = Promise.resolve(1);
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
  Promise.all([promise1, promise2]).then((values) => {
    console.log(values); // [1, 2]
  });

  // 如何使用catch方法处理Promise中的错误
  fetchWithTimeout('https://www.example.com')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  ```

### 面试题

- 实现一个超时请求处理
- Promise 的底层实现原理和使用场景
- 如何在 then 方法中返回一个 Promise 实例
- 如何使用 Promise.all 方法处理多个异步任务并发执行的场景
- 如何使用 catch 方法处理 Promise 中的错误

## **FAQ**

### 1、前端如何实现跨域？

**同源策略** ：同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。它的存在可以保护用户隐私信息，防止身份伪造等(读取 Cookie)。

- JSONP 的方式：创建一个 script 对象，将请求地址和参数插入 script.src 中，使用回调函数作为参数拿到请求数据。
- CORS 请求：请求头设置 Origin 为指定地址，响应头设置 Access-Control-Allow-Origin、Access-Control-Allow-Methods、Access-Control-Allow-Headers 和 Access-Control-Allow-Credentials 等响应头字段，以允许来自其他域的请求访问资源
- Nginx 反向代理：nginx 将请求转发到目标服务器

### 2、typeof 和 instanceof 的区别

typeof 是判断数据类型，返回的字符串

instanceof 是判断原型链的，返回布尔值

### 3、性能优化手段？（待补充）

- 合并 HTTP 请求
- Webpack 压缩代码、分包、小图片转 Base64
- 减少回流重绘
- 浏览器强缓存和协商缓存
- 图片懒加载
- 异步加载：defer/async 异步加载，按需加载；

### 4、for in 是否能遍历原型属性？

for in 可遍历原型链上可枚举的属性，用 hasOwnPrototype 判断

### 5、文件转 Base64 的两种方式（待补充）

- FileReader
- Blob

### 6、antd 怎么实现按需引入？

引入三个插件 react-app-rewired（重新编译）、customize-cra（配置）、babel-plugin-import（实现按需引入）

根据 config-overrides.js 的配置按需打包

### 7、如何实现路由鉴权？

使用 HOC 封装路由组件

### 8、react 如何渲染富文本？

使用标签属性 dangerouslySetInnerHTML 设置，如：

```javascript
<p dangerouslySetInnerHTML={{ __html: this.props.content }}></p>
```

### 9、伪数组和数组的区别？

伪数组：是一个有 length 属性的对象，没有数组的方法，但是索引快

数组：具有 Array.prototype 原型

### 10、业界常用的微前端解决方案有哪些？

iframe

Web Components

ESM

qiankun

EMP（跨应用状态共享，跨框架组件调用）

### 11、Scheduler 调度任务的优先级是怎样的？

生命周期：同步

受控的用户输入：同步

交互事件：高优先级

其他：低优先级
