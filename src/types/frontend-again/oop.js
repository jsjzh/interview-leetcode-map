/**
 * 对象是什么
 *
 * 对象是单个实物的抽象
 * 对象是一个容器，封装了属性 property 和 方法 method
 *
 * 构造函数是什么
 *
 * 函数体内部使用了 this 关键字，this 代表了所要生成的对象实例
 * 生成对象的时候，必须要使用 new 命令
 *
 * new 命令
 *
 * 原理
 *  创建一个空对象，作为将要返回的对象实例
 *  将这个空对象的原型 __proto__，指向构造函数的 prototype 属性
 *  将这个空对象赋值给函数内部的 this 关键字（就是调用构造函数并绑定函数内的 this 对象）
 *  开始执行构造函数内部的代码
 *
 * 注意点
 *  构造函数内部如果有 return 语句，并且 return 后面跟着的是一个对象，则 new 会返回这个对象，否则就不管 return 返回什么都返回 this 对象
 *
 * 为了避免将构造函数当成工具函数使用，可以在构造函数内部第一行加上 use strict，这样的话函数内部的 this 就不会指向全局了，默认等于 undefined，这时候如果给 this.xxx 赋值就会导致错误
 * 另一个解决办法是开头判断一下 this instanceof xxx，如果发现其并非是构造函数的实例，就返回一个构造函数
 */

function Animal(name) {
  this.name = name
}
Animal.prototype.sayName = function() {
  console.log(this.name)
}
function _new() {
  var args = [].slice.call(arguments)
  var constructor = args.shift()
  var context = Object.create(constructor.prototype)
  var result = constructor.apply(context, args)
  return typeof result === 'object' && result != null ? result : context
}
var cat = _new(Animal, 'cat')
// cat.sayName() // "cat"

/**
 * new.target
 * 函数内部可以使用 new.target 属性，如果当前函数是 new 命令调用，new.target 指向当前函数，否则为 undefined
 */

function f() {
  console.log(new.target === f)
  if (!new.target) throw new Error('请使用 new 命令调用！')
}
// f() // false
// new f() // true

/**
 * Object.create() 创建实例对象
 * 构造函数作为模板可以生成实例对象，但有时没有构造函数，只有一个对象，但又希望用该对象作为模板生成实例对象
 */
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log("Hi! I'm " + this.name + '.')
  }
}
var person2 = Object.create(person1)

/**
 * this
 *
 * 简单理解，this 就是属性或方法 "当前" 所在的对象
 * JavaScript 语言中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this 就是函数运行时所在的对象（环境）
 *
 * 实质
 *
 * 之所以有 this 的设计，跟内存里面的数据结构有关系
 *  var obj = { foo: 1 }
 * 以上的代码，JavaScript 引擎会先在内存里生成一个对象 { foo: 1 }，然后把这个对象的内存地址赋值给 obj
 * 也就是说 obj 是一个地址（reference），后面读取 obj.foo，引擎先从 obj 拿到内存地址，再从该地址读出原始的对象，返回他的 foo 属性
 * 上面的 foo 属性，是以下方法保存的
 *  {
 *    foo:{
 *      [[value]]: 1,
 *      [[Writable]]: true,
 *      [[enumerable]]:true,
 *      [[configurable]]:true,
 *    }
 *  }
 *
 * 问题就在于属性的值可能是一个函数
 *  var obj = { foo: function() {} }
 * 这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给 foo 属性的 value 属性
 *  {
 *    foo: {
 *      [[value]]: 函数的地址
 *      ...
 *    }
 *  }
 *
 * 由于函数是一个单独的值，所以他可以在不同的环境（上下文）执行，并且，JavaScript 允许在函数体内部引用当前环境的其他变量
 *  var x = 1
 *  // 访问其他变量
 *  function f() { console.log(x) }
 *  var obj = { f: f }
 *  // 单独执行
 *  f()
 *  // obj 环境执行
 *  obj.f()
 * 因为函数可以在不同的运行环境执行，所以就需要一种机制来获取函数体内部的运行环境（context），这就是 this
 *
 * 使用场合
 *  全局环境：在浏览器环境下，this 就指 window
 *  构造函数：构造函数中的 this，指的是实例对象
 *  对象的方法：this 指的就是方法运行时所在的对象
 */

/**
 * Function.prototype.call()
 * 改变函数运行时后的 this 指向
 *  第一个参数
 *    应该是一个对象，如果为空、null、undefined，则默认传入全局对象
 *    如果是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入 call 方法
 *  第 2~n 个参数
 *    调用函数时传入的参数
 *
 * Function.prototype.apply()
 * 和 call() 类似，只不过函数的参数由数组传入
 * 应用
 *  // 找出数组最大元素
 *  Math.max.apply(null, [1, 2, 3, 4, 5]) // 5
 *  // 将数组的空元素变为 undefined，就好像用 fill(undefined)
 *  Array.apply(null, ["a", , "b"]) // ["a", undefined, "b"]
 *  // 转换类数组对象
 *  Array.prototype.slice.apply({ 0: 1, length: 1 }) // [1]
 *
 * Function.prototype.bind()
 * 用于将函数体内的 this 绑定到某个对象，然后返回一个新函数，如果第一个参数是 null 或者 undefined，等于将 this 绑到全局对象
 * 另外，bind() 函数还有一个作用就是绑定参数，有点类似科里化的功能，具体可以参考下面代码
 * var d = new Date()
 * d.getTime() // 1562729874479
 * var print = d.getTime
 * print() // this is not a Date object.
 * 如上可以看到，print 函数内部调用了 this，所以会导致错误，改为如下绑定 this 即可
 * var print = d.getTime.bind(d)
 * print() // 1562730075381
 */

// bind() 和科里化有点类似，或者说也可以实现科里化的部分功能
// 简单的科里化实现
function curry(fn) {
  var _len = fn.length
  var _args = []
  return function _() {
    var args = Array.prototype.slice.apply(arguments)
    _args = _args.concat(args)
    if (_args.length >= _len) return fn.apply(null, _args)
    else return _
  }
}

var base = function(a, b) {
  return a + b
}
var curryFn = curry(base)
var plus5 = curryFn(5)
plus5(10) // 15

var _plus5 = base.bind(null, 5)
_plus5(10) // 15

/**
 * bind() 函数的三个应用
 */

// bind() 每次运行都会返回一个新函数，在监听事件的时候需要注意一些
// var listener = obj.handleClick.bind(obj)
// element.addEventListener('click', listener)
// element.removeEventListener('click', listener)

// 结合回调函数使用
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function() {
    this.times.forEach(
      function(n) {
        console.log(this.name)
      }.bind(this)
    )
  }
}
// obj.print() // 张三 * 3

// 结合 call 方法使用，可以改变一些 JavaScript 原生方法的使用形式
var arr = [1, 2, 3]
arr.slice(0, 1) // [1]

var slice = Function.prototype.call.bind(Array.prototype.slice)
slice(arr, 0, 1) // [1]
