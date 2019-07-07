/**
 * 对于使用字面量定义的原始变量，在使用其对应原型上的方法时，会创建一个临时变量，该变量只读，无法修改
 *
 * var foo = 10
 * foo.toString(2) // "1010"
 * 如上，在使用 toString() 的时候，是先创建了一个临时变量 new Number(10) 然后调用该对象上的方法来实现的
 */

/**
 * Boolean() 对象
 */

/**
 * Number() 对象
 *
 * 静态属性
 *  Number.POSITIVE_INFINITY：正的无限，指向 Infinity
 *  Number.NEGATIVE_INFINITY：负的无限，指向 -Infinity
 *  Number.NaN：表示非数值，指向 NaN
 *  Number.MIN_VALUE：表示最小的正数（最接近 0 但却不是0，在 64 位浮点数体系中该值为 5e-324），相应的，最接近 0 的负数为 -Number.MIN_VALUE
 *  Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即 9007199254740991
 *  Number.MIN_SAFE_INTEGER：表示能够精确标识的最小整数，即 -9007199254740991
 *
 * 实例方法
 *  Number.prototype.toString()
 *  该方法接受一个参数，表示想要转为的进制，默认为 10，输出字符串，该方法也可以对小数使用
 *  需要注意的是，该方法只能将十进制的数转为其他进制，如果要将其他进制转回十进制，要用 parseInt()
 *  (10).toString(2) // "1010"
 *  parseInt("1010", 2) // 10
 *  (10.5).toString(2) // "1010.1"
 *
 *  Number.prototype.toFixed()
 *  将一个数转为指定位数的小数，然后返回这个小数对应的字符串，有效范围为 0 到 20，超出会报错
 *  需要注意的是，由于浮点数的原因，小数 5 的四舍五入是不确定的
 *  (10.055).toFixed(2) // 10.05
 *  (10.005).toFixed(2) // 10.01
 *
 *  Number.prototype.toExponential()
 *  将一个数转为科学计数法形容，参数范围 0 到 20，表示小数点后有效数字的位数
 *  (1234).toExponential() // "1.234e+3"
 *
 *  Number.prototype.toPrecision()
 *  将一个数转为指定位数的有效数字，参数为有效数字的位数，范围从 1 到 21
 *  (12.34).toPrecision(5) // "12.340"
 */

/**
 * String() 对象
 *
 * 静态方法
 *  String.fromCharCode()
 *  该方法的参数是一个或多个数值，代表 unicode 码点，返回值是这些码点组成的字符串
 *  需要注意的是，该方法不指出 Unicode 码点大于 0xFFFF 的字符，即传入的参数不能大于 0xFFFF（即十进制的 65535），这个现象的原因在于码点大于 0xFFFF 的字符占四个字节，而 JavaScript 默认支持两个字节的字符，必要的话需要拆分码点
 *    0x20BB7 ===> 0xD842 0xDFB7
 *  String.fromCharCode(104, 101, 108, 108, 111) // "hello"
 *
 * 实例属性
 *  String.prototype.length
 *
 * 实例方法
 *  String.prototype.charAt()
 *  返回指定位置的字符，参数的范围从 0 开始，这完全可以用数组下标替代
 *
 *  String.prototype.charCodeAt()
 *  返回指定位置的字符的 unicode 码点（十进制表示），相当于 String.fromCharCode() 的逆操作
 *  需要注意的是，该方法返回的 Unicode 码点不会大于 65536（0xFFFF），如果遇到码点大于 65536 的字符，要使用两次 charCodeAt，不仅要读取 charCodeAt(i) 还要去读取 charCodeAt(i+1) 才能获取正确的值
 *  String.fromCharCode("𠮷".charCodeAt(0), "𠮷".charCodeAt(1)) // "𠮷"
 *
 *  String.prototype.concat()
 *  用于连接两个字符串，返回新的字符串，不改变原字符串
 *
 *  String.prototype.slice(start, end)
 *  用于从原字符串中取出子字符串并返回，不改变原字符串，如果第一个参数大于第二个参数，返回空字符串，参数为负数的话从结尾开始计算位置
 *  start：子字符串开始的位置，从 0 开始
 *  end：子字符串的结束位置（不包括该位置）
 *
 *  String.prototype.substring(start, end)
 *  用于从原字符串中取出子字符串并返回，不改变原字符串，参数代表意思和 slice() 相同，如果第一个参数大于第二个参数，会自动调换两个参数位置，如果参数是负数，会将参数转为 0
 *  不建议使用
 *
 *  String.prototype.substr(start, length)
 *  用于从原字符串中取出子字符串并返回，不改变原字符串
 *  start：子字符串开始的位置，从 0 开始
 *  length：要截取的字符串长度
 *
 *  String.prototype.indexOf()、String.prototype.lastIndexOf()
 *  两个方法都是查找一个字符串在另一个字符串出现的位置，不同的是 indexOf() 从开头开始找，lastIndexOf() 从结尾向前找，两个都接受第二个参数，表示从该位置开始查找
 *
 *  String.prototype.trim()
 *  取出字符串两端的空格，返回新字符串，不改变原字符串
 *  需要注意的是，这不仅可以去除空格，还可以去除制表符（\t、]v）、换行符（\n）、回车符（\r）
 *
 *  String.prototype.toLowerCase()、String.kprototype.toUpperCase()
 *  这两个方法一个将一个字符串全部转为小写，一个将字符串全部转为大写
 *
 *  String.prototype.match()
 *  用于确定字符串是否匹配某个字符串，若匹配到返回一个成员为匹配的第一个字符串，返回的数组还有一些其他属性，若没有找到返回 null
 *  var matchs = "cat, bat, sat, fat".match("at") // ["at"]
 *  match.index // 1
 *  match.input // "cat, bat, sat, fat"
 *
 *  String.prototype.search()、String.prototype.replace()
 *  search() 基本等同于 match，但是返回值为匹配的第一个位置，如果没有则返回 -1
 *  replace() 用于替换匹配的子字符串，一般只替换第一个匹配（除非使用带 g 的正则表达式）
 *
 *  String.prototype.split()
 *  按照给定规则分割字符串，返回一个分割出来的子字符串组成的数组
 *  还接受第二个参数，限定返回的数组的最大成员数
 *  如果省略参数
 *    "a|b|c".split() // ["a|b|c"]
 *  如果传入 "" 空字符串
 *    "a|b|c".split("") // ["a", "|", "b", "|", "c"]
 *  如果被分割的两部分紧邻着
 *    "a||c".split("|") // ["a", "", "c"]
 *  如果被分割的部分处于开头或结尾
 *    "|b|c".split("|") // ["", "b", "c"]
 *    "a|b|".split("|") // ["a", "b", ""]
 *
 *  String.prototype.localeCompare()
 *  用于比较两个字符串，返回一个整数，如果小于 0，表示第一个小于第二个，等于 0，则两者相等，大于 0，第一个大于第二个，该方法的最大特点就是会考虑自然语言的顺序
 *  "B" > "a" // false
 *  "B".localeCompare("a") // 1
 *  还接受第二个参数，指定所使用的语言，默认是英语
 */
