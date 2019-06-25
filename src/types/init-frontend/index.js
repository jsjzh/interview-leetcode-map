/**
 * 标签（label）
 * JavaScript 语言允许语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置
 * 标签通常与 break 和 continue 语句配合使用，跳出特定的循环
 */

// foo: for (let i = 0; i < 3; i++) {
//   bar: for (let j = 0; j < 3; j++) {
//     if (i === j) continue foo
//     console.log(`i = ${i}, j = ${j}`)
//   }
// }

// foo: for (var i = 0; i < 3; i++) {
//   for (var j = 0; j < 3; j++) {
//     if (i === 1 && j === 1) break foo
//     console.log('i=' + i + ', j=' + j)
//   }
// }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0

// bar: for (var i = 0; i < 3; i++) {
//   for (var j = 0; j < 3; j++) {
//     if (i === 1 && j === 1) continue bar
//     console.log('i=' + i + ', j=' + j)
//   }
// }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// i=2, j=0
// i=2, j=1
// i=2, j=2

/**
 * TODO https://wangdoc.com/javascript/types/number.html#%E6%95%B0%E5%80%BC%E7%B2%BE%E5%BA%A6
 * 64 位浮点数
 * 第 1 位：0 表示正数，1 表示负数 【决定一个数的正负】
 * 第 2 位 --- 第 12 位（共 11 位）：指数部分 【决定了数值的大小】
 * 第 13 位 --- 第 64 位（共 52 位）：小数部分（即有效数字） 【决定了数值的精度】
 */

/**
 * TODO https://wangdoc.com/javascript/types/number.html#%E6%95%B0%E5%80%BC%E8%8C%83%E5%9B%B4
 * 数值范围
 * Math.pow(2, 1024) // Infinity
 * Math.pow(2, -1075) // 0
 *
 * Number.MAX_VALUE // 1.7976931348623157e+308
 * Number.MIN_VALUE // 5e-324
 * Number.MAX_SAFE_INTEGER // 9007199254740991
 * Number.MIN_SAFE_INTEGER // -9007199254740991
 */

/**
 * 数值的表示法
 * 123e3 // 123000
 * 123e+3 // 123000
 * 123e-3 // 0.123
 * -3.1e12 // -3100000000000
 *
 * 自动转为科学计数法表示
 * 小数点前的数字多于 21 位
 * 小数点后的零多于 5 个
 */

/**
 * 数值的进制
 * 默认情况下，JavaScript 内部会自动将各种进制转为十进制
 * 十进制：没有前导 0 的数值
 * 八进制：有前缀 0o 或 0O 的数值，或者有前导 0、且只用到 0-7 的八个阿拉伯数字的数值（ES5 的严格模式和 ES6 已经废除这种表示法）
 * 十六进制：有前缀 0x 或 0X 的数值
 * 二进制：有前缀 0b 或 0B 的数值
 */

/**
 * 特殊数值
 *
 * -0 和 +0
 * -0 和 +0 的区别就是 64 位浮点数表示法的符号位不同
 * 几乎所有场合 -0 和 +0 都会被当作正常的 0
 * 唯一的有区别的场合是当他们被当作分母，返回的值是不相等的
 * 1 / +0 // +Infinity
 * 1 / -0 // -Infinity
 *
 * NaN
 * 表示非数字（Not a Number）
 * NaN 不等于任何值，包括它本身 NaN === NaN // false
 * 数组的 indexOf 方法内部使用的是 === 运算符，所以 [NaN].indexOf(NaN) // -1
 *
 * Infinity
 * 表示无穷
 */

/**
 * 与数值相关的全局方法
 *
 * parseInt()
 * 将字符串转为整数，如果参数不是字符串，则会先转为字符串再转换
 *  parseInt(1.23) 等同于 parseInt("1.23")
 * 转为整数的时候，是一个个字符依次转换的，如果遇到不能转为数字的字符，就返回已经转好的部分，但如果第一个字符就不能转为数字（后面跟着数字的正负号除外），返回 NaN
 *  parseInt("12**") // 12
 *  parseInt("*12**") // NaN
 *  parseInt("+12") // 12
 *  parseInt(".3") // NaN
 * 如果碰到会自动转为科学计数法的数字，会将科学计数法的表示方法视为字符串，会有一些奇怪的结果
 *  parseInt(0.0000008) // 8
 *  parseInt(8e-7) // 8
 *  parseInt("8e-7") // 8
 *  parseInt(0.0008) // 0
 *  parseInt(8e-4) // 0
 *  parseInt("8e-4") // 0
 * 还接受第二个参数，（2 --- 36 之间），表示被解析的值的进制，返回该值对应的十进制数
 */
