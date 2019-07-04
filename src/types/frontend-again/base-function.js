/**
 * 函数的声明
 * function foo() {}
 *
 * 函数表达式
 * var foo = function() {}
 * 如果后面加上函数名，该函数名只在函数体内部有效，外部无效
 *  var bar = function x() { console.log(typeof x) // function }
 *  console.log(x) // x is not defined
 */

/**
 * 函数的重复声明
 *
 * 值得注意的是，由于函数名的提升，前一次声明在任何时候都是无效的
 * function foo() { console.log(1) }
 * foo() // 2
 * function foo() { console.log(2) }
 * foo() // 2
 */

/**
 * 函数名的提升
 *
 * 如果采用函数声明式来声明函数，整个函数会像变量声明一样被提升到代码头部
 *  foo() // 2
 *  function foo() { console.log(2) }
 * 但如果采用函数表达式就会出错
 *  foo() // undefined is not a function
 *  var foo = function() { console.log(2) }
 *  会发生以上的结果是因为变量的提升，使用了 var 之后，foo 会被提升到顶部
 * 如果同时采用函数的声明和函数表达式来声明同一个函数，最后总是会采用函数表达式的函数
 *  var foo = function() { console.log(1) }
 *  function foo() { console.log(2) }
 *  foo() // 1
 */

/**
 * 函数的属性和方法
 *
 * name
 * 返回函数名称
 *  function f1() {}
 *  f1.name // f1
 *  var f2 = function() {}
 *  f2.name // f2
 *  var f3 = function foo() {}
 *  f3.name // foo
 *  注意，上面的例子真正的函数名还是 f3，foo 只能在函数体内部使用
 *
 * length
 * 返回该函数定义的时候可接受的参数个数
 *  function foo (a, b) {}
 *  foo.length // 2
 * 该属性提供了一种机制，判断定义时和调用时的参数的差异，以便实现面向对象编程的 "方法重载"（overload），就是同一个函数传入不同个数的参数，会调用不同的逻辑
 *
 * toString()
 * 返回一个字符串，内容是函数的源码，包括注释也可以返回
 * 对于原生函数，则回返回 function() {[native code]}
 */

/**
 * 函数作用域
 *
 * 作用域（scope）指的是变量存在的范围
 * 在 ES5 的规范中，JavaScript 只有两种作用域：全局作用域和函数作用域
 *  全局作用域：变量在整个程序中一直存在，所有地方都可以读取
 *  函数作用域：变量只在函数内部存在
 *  var foo = 1
 *  function f() { console.log(v) }
 *  f() // 1
 *
 *  var foo = 1
 *  function f() { var foo = 2; console.log(foo) }
 *  f() // 2
 *  foo // 1
 *
 * 值得注意的是，对于 var 命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量
 *  if (true) { var foo = 1 }
 *  foo // 1
 */

/**
 * 函数内变量提升
 *
 * 在函数内部，使用 var 命令声明的变量，不管在什么位置，都会被提升到函数体的头部
 */

/**
 * 函数本身的作用域
 *
 * 函数本身也是一个值，也有自己的作用域，它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关
 *
 * var a = 1
 * var x = function() { console.log(a) }
 * function f() { var a = 2; x() }
 * f() // 1
 *
 * var x = function() { console.log(a) }
 * function y(f) { var a = 2; f() }
 * y(x) // a is not defined
 *
 * function foo() {
 *  var x = 1;
 *  function bar() {
 *    console.log(x)
 *  }
 *  return bar
 * }
 * var x = 2
 * var f = foo()
 * f() // 1
 * 上面的这个例子，bar 函数在调用的时候，用到了 x，由于函数的作用域是在声明时定义的，所以这会去读取 foo 函数中的 x，这就是所谓的闭包现象
 */

/**
 * 函数参数的传递方式
 *
 * 函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value），这意味着在函数体内修改参数值不会影响到函数外部
 *  let a = 1
 *  function f (foo) { foo = 2 }
 *  f(a)
 *  a // 1
 * 但如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference），也就是穿，传入函数的原始值的地址，因此在函数内部修改参数将会影响到原始值
 *  let a = { name: 1 }
 *  function f (foo) { foo.name = 2 }
 *  f(a)
 *  a.name // 2
 * 值得注意的是，如果函数内部修改的不是参数对象的某个属性，而是替换掉整个参数，这时并不会影响到原始值，这个其实和变量的声明是一个道理
 *  var a = { name: 1 }
 *  var b = a
 *  b // { name: 1 }
 *  b.name = 2
 *  a // { name: 2 }
 *  b = { age: 1 }
 *  a // { name: 2 }
 */

/**
 * 同名参数
 *
 * 如果有同名参数，则取最后出现的那个值，即使后面的 a 没有值或被省略
 *  function f(a, a) { console.log(a) }
 *  f(1, 2) // 2
 * 如果想获取第一个参数，可以使用 arguments 对象
 *  function f(a, a) { console.log(arguments[0]) }
 *  f(1, 2) // 1
 */

/**
 * arguments 对象
 *
 * 该对象包含了函数运行时的所有参数，arguments[0] 就是第一个参数，以此类推
 * 非严格模式下 arguments 对象可以在运行时修改，严格模式下，arguments 对象与函数参数不具有联动关系，修改 arguments 对象不会影响到实际的函数参数
 *
 * length 属性
 * 该属性可以得知该函数在调用的时候传入了几个参数
 *
 * 与数组的关系
 * 虽然 arguments 很像数组，但他并不是数组，他是一个对象，不能直接使用数组专有的方法，但可以将其转为真正的数组
 *  var args = Array.prototype.slice.call(arguments)
 *  var args = []
 *  for (var i = 0; i < arguments.length, i++) {
 *    args.push(arguments[i])
 *  }
 *
 * callee 属性
 * 该属性返回它所对应的原函数，但是在严格模式下禁用
 */

/**
 * 闭包
 *
 * 闭包简单的理解就是 "定义在一个函数内部的函数"
 * function f1() {
 *  var n = 1
 *  function f2() {
 *    console.log(n)
 *  }
 *  return f2
 * }
 * var result = f1()
 * result() // 1
 * 如上例子，f1 的返回值是函数 f2，由于 f2 可以读取 f1 的内部变量，就可以在外部获得 f1 的内部变量了，这就是 JavaScript 语言特有的 "链式作用域" 结构（chain scope），子对象会一级级地向上寻找所有父对象的变量
 */

/**
 * 立即调用的函数表达式（IIFE）
 *
 * var i = function() { //code }();
 * true && function() { //code }();
 * 0, function() { //code }();
 * !function() { //code }();
 * ~function() { //code }();
 * -function() { //code }();
 * +function() { //code }();
 * 以上这些都可以实现函数立即调用，任何让解释器以表达式来处理函数定义的方法，都可以成为 IIFE
 *
 * 立即调用的函数表达式结合闭包可以避免污染全局变量
 * (function() {
 *  var temp = 1
 *  f1(temp)
 *  f2(temp)
 * })()
 */

/**
 * eval
 *
 * 该命令接受一个字符串作为参数，并将这个字符串当作语句执行，如果参数不是字符串，会原样返回
 * eval 没有自己的作用域，都在当前的作用域内执行，因此可能会修改当前作用于的变量的值，有安全问题
 *  var foo = 1
 *  eval("fpp = 2")
 *  foo // 2
 * 在严格模式下，eval 内部声明的变量不会影响到外部作用域，但是严格模式下 eval 依然可以读写当前作用域的变量
 *  "use strict"
 *  var bar = 1
 *  eval("var foo = 123")
 *  foo // foo is not defined
 *  eval("bar = 2")
 *  bar // 2
 *
 * 别名调用
 *
 * var foo = eval
 * foo("var x = 1")
 * x // 1
 * 如上这种情况，引擎在静态代码分析的阶段，无法分辨执行的是 eval，就无法进行代码优化
 * 为了保证别名不影响优化，JavaScript 的标准规定，凡是使用别名执行 eval，eval 内部一律是全局作用域
 * var a = 1
 * function f() {
 *  var a = 2
 *  var e = eval
 *  e("console.log(a)")
 * }
 * f() // 1
 * 如上，eval 即便在函数中，他的作用域还是全局作用域，因此输出的 a 为全局变量中的 a
 * eval.call(null, "...")
 * window.eval("...")
 * (1, eval)("...")
 * (eval, eval)("...")
 * 以上都是 eval 的别名调用，作用域都是全局作用域
 */
