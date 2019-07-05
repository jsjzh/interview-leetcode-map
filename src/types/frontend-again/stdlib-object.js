/**
 * Object()
 *
 * Object() 本身是一个函数，可以将任意值转为对象
 *
 * 传入原始类型的值，会返回一个该原始类型值对应的包装对象
 *  undefined null
 *    var obj = Object() ===> Object(undefined) ===> Object(null)
 *    obj instanceof Object // true
 *  数值 字符串 布尔值
 *    var obj = Object(1)
 *    obj instanceof Object // true
 *    obj instanceof Number // true
 *    var obj = Object("foo")
 *    obj instanceof Object // true
 *    obj instanceof String // true
 *    var obj = Object(true)
 *    obj instanceof Object // true
 *    obj instanceof Boolean // true
 * 传入对象，总是返回该对象，不用转换
 *    var foo = [] or {} or function() {}
 *    var obj = Object(foo)
 *    obj === foo // true
 * 利用以上特性，可以用来判断变量是否为对象
 * function isObject(value) { return value === Object(value) }
 */

/**
 * new Object()
 *
 * 用来生成新对象，var obj = new Object() 和 var obj = {} 是等价的
 * 和 Object() 类似，若传入对象，则直接返回该对象，若传入原始值则返回该值对应的包装对象
 * 需要注意的是，虽然用法相似，但是语义不同
 * Object(value) 表示将 value 转成一个对象
 * new Object(value) 表示新生成一个对象，他的值是 value
 */

/**
 * Object 的静态方法
 *
 * 所谓静态方法，是指部署在 Object 对象自身的方法
 *
 * Object.keys()、Object.getOwnPropertyNames()
 * 这两个方法都用来遍历对象自身的属性（而不是继承的），若没有则返回一个空数组，区别就是 keys 只返回可枚举的属性，而 getOwnPropertyNames 还返回不可枚举的属性
 * var arr = [999]
 * Object.keys(arr) // ["0"]
 * Object.getOwnPropertyNames(arr) // ["0", "length"]
 * 由上可知，length 是不可枚举的属性
 */

/**
 * 对象属性模型的相关方法
 * Object.getOwnPropertyDescriptor()：获取某个属性的描述对象
 * Object.defineProperty()：通过描述对象，定义某个属性
 * Object.defineProperties()：通过描述对象，定义多个属性
 */

/**
 * 控制对象状态的方法
 * Object.preventExtensions()：防止对象扩展
 * Object.isExtensible()：判断对象是否可扩展
 * Object.seal()：禁止对象配置
 * Object.isSealed()：判断一个对象是否可配置
 * Object.freeze()：冻结一个对象
 * Object.isFrozen()：判断一个对象是否被冻结
 */

/**
 * 原型链相关方法
 * Object.create()：该方法可以指定原型对象和属性，返回一个新的对象
 * Object.getPrototypeOf()：获取对象的 Prototype 对象
 */

/**
 * Object 的实例方法
 *
 * 所谓实例方法，是指定义在 Object.prototype 对象上的方法，所有 Object 的实例对象都继承这些方法
 *
 * Object.prototype.valueOf()：返回当前对象对应的值
 * Object.prototype.toString()：返回当前对象对应的字符串形式
 * Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式
 * Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性
 * Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型
 * Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举
 */

/**
 * Object.prototype.valueOf()
 *
 * 返回一个对象的值，默认情况下返回对象本身
 * var obj = {}
 * obj.valueOf() === obj // true
 *
 * Object.prototype.toString()
 *
 * 返回一个对象的字符串形式，默认情况下返回类型字符串
 * var obj = {}
 * obj.toString() // [object Object]
 * 数组、字符串、函数、Date 对象都定义了自身的 toString 方法，覆盖了 Object.prototype.toString、
 *
 * 可以通过 call 来调用 Object.prototype.toString 来获取一个数据到底是什么类型
 * function realType(value) { return Object.prototype.toString.call(value) }
 */
var plusTypeof = function(value) {
  var str = Object.prototype.toString.call(value)
  return str.match(/\[object (.*?)\]/)[1].toLowerCase()
}

var types = ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp']

types.forEach(function(t) {
  plusTypeof['is' + t] = function(o) {
    return plusTypeof(o) === t.toLowerCase()
  }
})

plusTypeof.isObject({}) // true
plusTypeof.isNumber(NaN) // true
plusTypeof.isRegExp(/abc/) // true

/**
 * Object.prototype.toLocaleString()
 *
 * 该方法主要作用是留出一个接口，让各种不同的对象实现自己版本的 toLocaleString，用来返回针对某些地域的特定的值
 *
 * 有三个对象自定义了 toLocaleString 方法
 * Array.prototype.toLocaleString
 * Number.prototype.toLocaleString
 * Date.prototype.toLocaleString
 *
 * 日期的实例对象的 toString 和 toLocaleString 返回值就不同，toLocaleString 的返回值和用户设置的所在地域有关
 */
var date = new Date()
date.toString() // Thu Jul 04 2019 21:56:56 GMT+0800 (中国标准时间)
date.toLocaleString() // 2019/7/4 下午9:56:56

/**
 * Object.prototype.hasOwnProperty()
 *
 * 接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性
 */
var obj = { foo: 123 }
obj.hasOwnProperty('foo') // true
obj.hasOwnProperty('toString') // false 因为 toString 是继承来的

/**
 * 属性描述对象（attributes object）
 *
 * JavaScript 提供了一个内部数据结构用来描述对象的属性，控制他的行为，比如是否可写、可遍历、可配置
 *
 * value：默认 undefined
 * writable：布尔值，默认 true，表示 value 是否可改变
 * enumerable：布尔值，默认 true，表示 value 是否可遍历，如果为 false，for...in、Object.keys、JSON.stringify 会跳过该属性
 * configurable：布尔值，默认 true，表示是否可以修改属性描述对象
 *  如果为 false
 *    writable 从 false -> true 报错，true -> 不报错
 *    value 只要 writable 和 configurable 有一个为 true 就允许改动
 *    delete 不能删除属性
 * get：函数，默认 undefined，表示该属性的取值函数
 * set：函数，默认 undefined，表示该属性的存值函数
 *
 * 需要注意的是，一旦定义了 get 或者 set，就不能将 wirtable 属性设置为 true，也不能定义 value 属性
 */

/**
 * Object.getOwnPropertyDescriptor()
 *
 * 获取属性描述对象，只能用于对象自身的属性，不能查找继承的属性
 * 第一个参数为目标对象，第二个参数为属性名
 *
 * var obj = { foo: 123 }
 * Object.getOwnPropertyDescriptor(obj, "foo") // {value: 123, writable: true, enumerable: true, configurable: true}
 */

/**
 * Object.defineProperty()、Object.defineProperties()
 *
 * 用来定义或修改一个或多个属性描述对象，返回修改后的对象
 * 第一个参数为属性所在的对象，第二个参数为属性名，第三个为属性描述对象
 */
var obj = Object.defineProperty({}, 'foo', {
  value: 123,
  writable: false,
  enumerable: false,
  configurable: false
})

var obj = Object.defineProperties(
  {},
  {
    foo: { value: 123, writable: false },
    bar: { value: 321, writable: true }
  }
)

/**
 * Object.prototype.propertyEnumerable()
 *
 * 返回一个布尔值，用来判断某个属性是否可遍历，这个属性必须是自身的属性，如果是继承的属性一律返回 false
 */

/**
 * 存取器
 */

var obj = Object.defineProperty({}, 'foo', {
  get: function() {
    return 123
  },
  set: function(val) {
    console.log('setter: ' + val)
  }
})
// 以下写法和上面的写法等价
var ob = {
  get foo() {
    return 123
  },
  set foo(val) {
    console.log('setter: ' + val)
  }
}

/**
 * 拷贝一个有存取器的对象
 */
var extend = function(to, from) {
  for (var property in from) {
    if (from.hasOwnProperty(property)) {
      Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(from, property))
    }
  }
  return to
}

/**
 * 控制对象状态
 *
 * 有时需要冻结对象的读写状态，防止对象被改变
 * Object.preventExtensions()、Object.seal()、Object.freeze()
 *
 * 局限性
 * 可以通过改变对象的原型对象来增加属性，并且如果对象的某一属性也是对象，就无法冻结该对象
 * var obj = { arr: [1] }
 * Object.freeze(obj)
 * var proto = Object.getPrototypeOf(obj)
 *
 * proto.t = "123"
 * obj.arr.push(2)
 */

/**
 * Object.preventExtensions()：使一个对象无法添加新属性
 * Object.isExtensible()：判断一个对象可不可以添加属性（就是判断 Object.preventExtensions()）
 */

/**
 * Object.seal()：使一个对象无法添加新属性也无法删除旧属性，实质是把属性描述对象的 configurable 属性改为 false
 * Object.isSealed()：检查一个对象是否使用了 Object.seal()
 */

/**
 * Object.freeze()：使一个对象无法添加新属性、无法删除旧属性、无法改变属性的值，实质是把属性描述对象的 writable 和 configurable 属性改为 false
 * Object.isFrozen()：检查一个对象是否使用了 Object.freeze() 方法
 */
