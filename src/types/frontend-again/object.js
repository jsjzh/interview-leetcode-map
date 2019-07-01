/**
 * 对象
 *
 * 对象采用大括号表示，这导致一个问题，如果行首是一个大括号，他到底是表达式还是语句？
 * 为了避免这种歧义，如果遇到这种无法确定是对象还是代码块的情况，一律解释为代码块
 *  ({ console.log(123) })
 * 如果要解释为对象，最好在大括号前加上圆括号
 *  ({ foo: 123 })
 * 这种差异在 eval 种反映最明显
 *  eval("{ foo: 123 }") // 123
 *  eval("({ foo: 123 })") // { foo: 123 }
 *
 * delete
 * 用于删除某一对象的属性，注意，不管删除的属性是否存在与该对象上，都会返回 true，只有一种情况下回返回 false，那就是该属性存在，且不得删除
 * var foo = { a: 123 }
 * delete foo.a // true
 * delete foo.b // true
 * var bar = Object.defineProperty({}, "a", { value: 123, configurable: false })
 * delete bar.a // false
 * 另外，有一点需要注意的是，delete 只能删除对象本身的属性，无法删除继承的属性
 *
 * in
 * 用于判断属性是否存在，in 的问题就是无法判断属性是否是对象自身的，这个时候可以使用对象的 hasOwnProperty 方法判断
 *  var foo = { a: 123 }
 *  if ("a" in foo) {
 *    console.log(foo.hasOwnProperty("toString")) // false
 *    console.log(foo.hasOwnProperty("a")) // true
 *  }
 *
 * for...in
 * 用来遍历一个对象的全部属性（可遍历的，enumerable），它不仅遍历对象自身的属性，还遍历继承的属性
 * 一般情况下都只想遍历对象自身的属性，所以使用 for...in 的时候，一般会结合 hasOwnProperty 方法
 *  for (var key in foo) {
 *    if (foo.hasOwnProperty(key)){
 *      console.log(key)
 *    }
 *  }
 */

/**
 * with
 *
 * 作用是同时操作一个对象的多个属性
 * 注意，如果 with 区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创建一个当前作用域的全局变量
 */
// var foo = { a: 123, b: 321 }
// with (foo) {
//   a = 321
//   b = 123
// }
// // ===
// foo.a = 321
// foo.b = 123
// with (document.links[0]) {
//   console.log(href)
//   console.log(title)
//   console.log(style)
// }
// // ===
// console.log(document.links[0].href)
// console.log(document.links[0].title)
// console.log(document.links[0].style)
