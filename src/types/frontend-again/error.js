/**
 * Error
 *
 * JavaScript 原生提供 Error 构造函数，所有抛出的错误都是这个构造函数的实例
 *
 * JavaScript 语言标准只提到 Error 实例对象必须有 message 属性，表示出错时的提示信息，但大多数 JavaScript 引擎对 Error 实例还提供 name 和 stack 属性，分别表示错误的名称和错误的堆栈
 *
 * 出现 Error 错误会导致后续的函数不再运行，但是需要注意的是并不是 Error 实例导致的，而是 throw 导致的
 * console.log(123)
 * throw new Error("error")
 * console.log(321) // 不会打印
 *
 * 原生错误类型
 *
 * 在 Error 的基础上，JavaScript 还定义了 6 种错误对象
 *
 * SyntaxError 对象：解析代码时发生的语法错误
 *  var 1abc // 变量名错误 ===> Uncaught SyntaxError: Invalid or unexpected token
 *  console.log "hello") // 缺少括号 ===> Uncaught SyntaxError: Unexpected string
 *
 * ReferenceError 对象：引用一个不存在的对象时发生的错误，将一个值分配给无法分配的对象
 *  unknownVariable // 使用一个不存在的变量 ===> Uncaught ReferenceError: unknownVariable is not defined
 *  console.log() = 1 // 等号左侧不是变量 ===> Uncaught ReferenceError: Invalid left-hand side in assignment
 *  this = 1 // this 对象不能手动赋值 ===> Uncaught ReferenceError: Invalid left-hand side in assignment
 *
 * RangeError 对象：是一个值超出有效范围时发生的错误，例如数组长度为负数；Number 对象的方法参数超出范围；函数堆栈超过最大值
 *  new Array(-1) // 数组长度不得为负数 ===> Uncaught RangeError: Invalid array length
 *
 * TypeError 对象：变量或参数不是预期类型时发生的错误
 *  new 123 ===> Uncaught TypeError: 123 is not a constructor
 *  var obj = {}
 *  obj.unknownMethod() ===> Uncaught TypeError: obj.unknownMethod is not a function
 *
 * URIError 对象：对 URI 相关函数的参数不正确时抛出的错误，主要涉及 encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()、unescape() 六个函数
 *  decodeURI('%2') ===> Uncaught URIError: URI malformed
 *
 * EvalError 对象：eval 函数没有被正确执行时会抛出的错误
 *
 * 自定义错误
 * function selfError(message) {
 *  this.message = message || "no message"
 *  this.name = "selfError"
 * }
 * selfError.prototype = new Error()
 * selfError.prototype.constructor = selfError
 */

/**
 * throw 语句
 *
 * 对于 JavaScript 引擎来说，遇到 throw 语句，程序就终止了，至于 throw 什么东西，任何类型都行
 * throw "error"
 * throw new Date()
 */

/**
 * try...catch 结构
 *
 * 若在 try 代码块中有抛出错误，则立即把代码的执行转到 catch 代码块，或者说错误被 catch 代码块捕获了，catch 接受一个参数，表示 try 代码块抛出的值
 * 值得注意的是，如果程序中有错误，常理来看运行至此会停下，但如果该错误包裹在 try 代码块中，则错误不会组织代码运行
 * try {
 *   throw 'error'
 * } catch (e) {
 *   console.log(123)
 * }
 * console.log(321)
 * // 123
 * // 321
 *
 * catch 代码块中可以继续抛出错误，也可以嵌套多层 try...catch 结构
 *
 * finally 语句
 * try...catch 允许在背后添加 finally 语句，该语句在任何时候都会运行
 *
 * var foo = 0
 * function bar() {
 *   try {
 *     return foo
 *   } finally {
 *     foo++
 *   }
 * }
 * bar() // 0
 * foo // 1
 * 由上面的例子可以知道一个事，return 语句的执行是在 finally 之前，只是等到 finally 执行完毕之后才返回
 */

function f() {
  try {
    console.log(0)
    throw 'bug'
  } catch (e) {
    console.log(1)
    return true // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2) // 不会运行
  } finally {
    console.log(3)
    return false // 这句会覆盖掉前面那句 return
    console.log(4) // 不会运行
  }
  console.log(5) // 不会运行
}
var result = f()
// 0
// 1
// 3
result
// false
