/**
 * 64 位浮点数
 *
 * TODO https://wangdoc.com/javascript/types/number.html#%E6%95%B0%E5%80%BC%E7%B2%BE%E5%BA%A6
 * 第 1 位：0 表示正数，1 表示负数 【决定一个数的正负】
 * 第 2 位 --- 第 12 位（共 11 位）：指数部分 【决定了数值的大小】
 * 第 13 位 --- 第 64 位（共 52 位）：小数部分（即有效数字） 【决定了数值的精度】
 */

/**
 * 数值范围
 *
 * TODO https://wangdoc.com/javascript/types/number.html#%E6%95%B0%E5%80%BC%E8%8C%83%E5%9B%B4
 */

// Math.pow(2, 1024) // Infinity
// Math.pow(2, -1075) // 0

// Number.MAX_VALUE // 1.7976931348623157e+308
// Number.MIN_VALUE // 5e-324
// Number.MAX_SAFE_INTEGER // 9007199254740991
// Number.MIN_SAFE_INTEGER // -9007199254740991

/**
 * 数值的表示法
 *
 * 会自动转为科学计数法表示的情况
 *  小数点前的数字多于 21 位
 *  小数点后的零多于 5 个
 */

// 123e3 // 123000
// 123e+3 // 123000
// 123e-3 // 0.123
// -3.1e12 // -3100000000000

/**
 * 数值的进制
 *
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
 *  parseInt("+a12") // NaN
 *  parseInt(".3") // NaN
 * 根据上面的特性，会有一些意外的结果
 *  parseInt(0x11, 36) // 43 ===> parseInt(String(0x11, 36)) ===> parseInt("17", 36)
 *  parseInt(0x11, 2) // 1 ===> parseInt(String(0x11, 2)) ===> parseInt("17", 2)
 *  parseInt(011, 2) // NaN ===> parseInt(String(011), 2) ===> parseInt(String(9), 2)
 *  parseInt("011", 2) // 3
 * 如果碰到会自动转为科学计数法的数字，会将科学计数法的表示方法视为字符串，会有一些奇怪的结果
 *  parseInt(0.0000008) // 8
 *  parseInt(8e-7) // 8
 *  parseInt("8e-7") // 8
 *  parseInt(0.0008) // 0
 *  parseInt(8e-4) // 0
 *  parseInt("8e-4") // 0
 * 还接受第二个参数，（2 --- 36 之间），表示被解析的值的进制，返回该值对应的十进制数
 * 如果第二个参数不是数值，会被自动转为一个整数，如果不在（2 --- 36）之间，则返回 NaN，如果第二个参数是 0、undefined、null 则直接忽略
 * 如果字符串包含对于指定进制无意义的字符，则只返回可以转换的数值，从最高位开始，如果最高位无法转换，则返回 NaN
 *  parseInt("1546", 2) // 1
 *  parseInt("546", 2) // NaN
 *
 * parseFloat()
 * 用于将一个字符串转为浮点数
 * 如果字符串符合科学计数法，则会进行相应的转换
 *  parseFloat("314e-2") // 3.14
 *  parseFloat("0.0314e+2") // 3.14
 * 如果字符串包含不能转为浮点数的字符，则不进行后面的转换，返回已经转好的部分
 *  parseFloat("3.14abcd") // 3.14
 * parseFloat 和 parseInt 都会自动过滤字符串前导的空格
 *  parseFloat("\t\v\r12.34\n ") // 12.34
 * 如果字符串的第一个字符不能转为浮点数，则返回 NaN，值得注意的是，parseFloat 和 parseInt 会将空字符串转为 NaN
 * 和 Number 不同的地方
 *  parseFloat(true) // NaN
 *  Number(true) // 1
 *  parseFloat(null) // NaN
 *  Number(null) // 0
 *  parseFloat("") // NaN
 *  Number("") // 0
 *  parseFloat("123.45#") // 123.45
 *  Number("123.45#") // NaN
 *
 * isNaN()
 * 可以用来判断一个值是否为 NaN
 * 但是，该方法只对数值有效，如果传入其他值，会先试图将其转为数值，比如传入字符串的时候，字符串会先被转成 NaN，然后经行判断
 *  isNaN("test") // true ===> inNaN(Number("test"))
 *  isNaN({}) // true ===> isNaN(Number({}))
 *  isNaN(["xyz"]) // true ===> isNaN(Number(["xyz"]))
 * 还有一些特殊情况，对于空数组和只有一个数值成员的数组，会返回 false，之所以会这样，是因为被 Number() 转为了数值
 *  isNaN([]) // false
 *  isNaN([123]) // false
 *  isNaN(["123"]) // true
 * 判断 NaN 更可靠的方法，是利用他的特性，NaN 是唯一一个不等于自身的值
 *  function myIsNaN(value) { return value !== value }
 *
 * isFinite()
 * 该方法返回一个布尔值，表示某个值是否为正常的数值
 *  除了 Infinity、-Infinity、NaN、undefined 这几个值会返回 false，其他的数值都会返回 true，如果传入的不是数值，则会通过转换将其转为数值
 */
