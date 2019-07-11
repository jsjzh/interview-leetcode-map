/**
 * JSON 对象
 *
 * 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象
 * 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值、null（不能用 NaN、Infinity、-Infinity、undefined）
 * 字符串必须使用双引号表示，不能使用单引号
 * 对象的键名必须放在双引号里面
 * 数组或对象最后一个成员的后面不能加逗号
 *
 * 静态方法
 *  JSON.stringify()
 *  用于将一个值转为 JSON 字符串
 *  需要注意的是，对于原始类型的字符串，转换结果会带来双引号，这是因为将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其它类型的值
 *    JSON.stringify("foo") // ""foo""
 *  如果对象的类型是 undefined、函数或 XML 对象，该属性会被过滤
 *  如果数组的成员是 undefined、函数或 XML 对象，这些值会被转成 null
 *  正则对象会被转成空对象
 *  该方法还会忽略对象的不可遍历的属性
 *
 *  该方法还可以接受一个数组作为第二个参数，指定需要转成字符串的属性，这个类似白名单的数组只对对象的属性有效，对数组无效
 *  var obj = { prop1: 1, prop2: 2 }
 *  JSON.stringify(obj, ["prop1"]) // "{"prop1":1}"
 *  第二个参数还可以是一个函数，用来更改 JSON.stringify() 的返回值，该函数接受两个参数，分别是被转换的对象的键名和键值
 *  递归处理中，每一次处理的对象都是前一次返回的值，并且如果函数返回 undefined 或没有返回值，则改属性会被忽略
 *  该函数还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性，如果是数字，表示每个属性前面添加的空格（最多不超过 10）；如果是字符串（不超过 10 个字符），则该字符串会添加在每行前面
 */
var count = 0
var foo = JSON.stringify({ a: 1, b: { c: 2 } }, function(key, value) {
  count++
  if (typeof value === 'number') value = value * 2
  return value
})
foo // {"a":2,"b":{"c":4}}
// 需要注意的是，该函数会被调用 4 次，第 1 次键名为空，键值是整个对象，第 2 次键名是 a，键值是 2。第 3 次键名是 b，键值是 { c: 2 }，第 4 次键名是 c，键值是 2
// 另外，可以看到 c 也被 * 2 了，这更说明这个是递归调用了
count // 4

JSON.stringify({ p1: 1, p2: 2 }, null, 2)
// "{
//   "p1": 1,
//   "p2": 2
// }"

/**
 * 参数对象的 toJSON 方法
 * 如果参数对象有自定义的 toJSON 方法，那么 JSON.tostringify() 会使用这个方法的返回值作为参数
 *
 * Date 对象就有一个自己的 toJSON 方法
 * toJSON 方法的一个应用就是将正则对象转为字符串，因为 JSON.stringify() 默认不能转换正则对象
 * RegExp.prototype.toJSON = RegExp.prototype.toString
 */

var user = {
  firstName: '三',
  lastName: '张',
  get fullName() {
    return this.lastName + this.firstName
  }
}
JSON.stringify(user) //"{"firstName":"三","lastName":"张","fullName":"张三"}"

var user = {
  firstName: '三',
  lastName: '张',
  get fullName() {
    return this.lastName + this.firstName
  },
  toJSON: function() {
    return {
      name: this.lastName + this.firstName
    }
  }
}
JSON.stringify(user) // "{"name":"张三"}"

/**
 * JSON.parse()
 * 使用该方法的时候需要注意单引号字符串不是正确的 JSON 格式
 * 该方法也接受一个处理函数作为第二个参数
 */

JSON.parse('true') // true
JSON.parse('"true"') // "true"
JSON.parse('{"name": "张三"}') // {name: "张三"}

function f(key, value) {
  if (key === 'a') {
    return value + 10
  }
  return value
}
JSON.parse('{"a": 1, "b": 2}', f) // {a: 11, b: 2}
