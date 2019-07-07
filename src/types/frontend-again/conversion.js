/**
 * 动态类型语言
 *
 * var x = y ? 1 : "a"
 * 如上，x 的类型没法在编译阶段就知道，必须等到运行时才能知道
 */

/**
 * 强制转换
 *
 * Number()、String()、Boolean()
 */

/**
 * Number()
 *
 * 使用该函数，可以将任意类型的值转化成数值
 *
 * 原始类型值
 *  数值：转换后还是原来的值
 *    Number(123) // 123
 *  字符串：如果可以被解析成数值，则转换为相应的数值，若存在不能解析的字符串，则返回 NaN，但是 parseInt() 则会解析至无法解析为止，值得注意的是，这两个方法都可以自动过滤一个字符串前导和后缀的空格，可以想象成是用了 trim() 处理，但是对于字符串内的空格就无法处理了
 *    Number("123") // 123
 *    Number("123 abc") // NaN
 *    parseInt("123 abc") // 123
 *    Number("\t\v\r12.34\n") // 12.34
 *    parseInt("\t\v\r12.34\n") // 12
 *    Number(" 123 123 123 ") // NaN
 *    parseInt(" 123 123 123 ") // Nan
 *    空字符串转为 0，但是 parseInt() 面对空字符串又是转为 NaN
 *    Number("") // 0
 *    Number(" ") // 0
 *    parseInt("") // NaN
 *    parseInt(" ") // NaN
 *  布尔值：true 转为 1，false 转为 0，但是 parseInt() 面对布尔值都是转为 NaN
 *    Number(true) // 1
 *    Number(false) // 0
 *  undefined：转为 NaN
 *    Number(undefined) // NaN
 *  null：转为 0
 *    Number(null) // 0
 *
 * 对象（广义对象，函数、对象、数组）
 * 简单的规则是，除了包含单个数值（或可以转为数值的字符串）的数组之外，其他对象都返回 NaN
 *  Number({ a: 1 }) // NaN
 *  Number([1, 2, 3]) // NaN
 *  Number(["123"]) // 123
 * 对象转换原理：算法分为三步
 *  调用对象自身的 valueOf() 方法，如果返回原始类型的值则直接对该值使用 Number()
 *  若发现 valueOf() 返回的是对象，则改为（注意，是改为，而不是对第一步的返回的对象继续调用）用 toString()，若返回原始类型的值则对该值使用 Number()
 *  若 toString() 返回的还是对象，就报错
 */

/**
 * String()
 *
 * 使用该函数，可以将任意类型的值转为字符串
 *
 * 原始类型值
 *  数值：转为相应的字符串
 *  字符串：转换后还是原来的值
 *  布尔值：true 转为 "true"，false 转为 "false"
 *  undefined：转为 "undefined"
 *  null：转为 "null"
 *
 * 对象
 *  如果是对象，返回一个类型字符串，如果是数组，返回该数组的字符串形式
 *    String({ a: 1 }) // "[object Object]"
 *    String([1, 2, 3]) // "1,2,3"
 * 对象转换原理：算法分为三步，和 Number() 类似，只不过互换了 valueOf() 和 toString() 两个函数调用顺序
 *  调用对象自身的 toString() 方法，如果返回原始类型的值则对该值使用 String()
 *  若发现 toString() 返回的是对象，则改为调用 valueOf()，如果返回原始类型的值则对该值使用 String()
 *  若 valueOf() 返回的还是对象，就报错
 */

/**
 * Boolean()
 *
 * 该函数可以将任意类型的值转为布尔值
 * 转换规律比较简单，除了以下值，其他都转为 true
 * undefined
 * null
 * 0（包括 -0 和 +0）
 * NaN
 * ""
 * 对于 true 和 false，Boolean() 转换不会发生变化
 * 所有的对象（包括空对象）都是返回 true，甚至是 new Boolean(false) 也是返回 true
 */

/**
 * 自动转换
 *
 * 自动转换是以强制转换为基础的
 *
 * 会自动转换数据类型的情况
 * 第一种：不同类型的数据相互运算
 *  123 + "abc" // "123abc"
 * 第二种：对非布尔值类型的数据求布尔值
 *  if ("abc") { ... }
 * 第三种：对非数值类型的值用医院运算符（+ 和 -）
 *  +{ foo: "bar" } // NaN
 *  -[1, 2, 3] // NaN
 *
 * 转换规则：预期用什么类型的值，就调用该类型的转换函数
 * 由于具有以上不确定性，而且不易除错，建议在预期为布尔值、数值、字符串的地方显式调用 Boolean()、Number()、String() 来进行转换
 *
 * 自动转为布尔值的情况，内部调用的就是 Boolean()
 * expression ? true : false
 * !! expression
 *
 * 自动转为字符串的情况，内部调用的就是 String()
 * 主要发生在字符串的加法运算时
 *
 * 自动转为数值的情况，内部调用的就是 Number()
 * 除了加法运算符有可能把运算子转为字符串，其他运算符都会把运算子自动转为数值
 * 一元运算符也会把运算子转成数值，转换的时候使用的就是 Number() 方法，所以 +"abc" // NaN
 * 值得注意的是，在面对 null 和 undefined 的时候，前者转换为 0，后者为 NaN
 */
