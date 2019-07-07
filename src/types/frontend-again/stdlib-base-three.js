/**
 * Regexp 对象
 *
 * var reg = /xyz/
 * var reg = new RegExp("xyz")
 * 以上两种方法的区别，第一种在引擎编译代码时就会新建正则表达式，第二种给你在运行时新建表达式。
 *
 * 实例属性
 *  RegExp.prototype.ignoreCase：返回一个布尔值，表示是否设置了 i 修饰符
 *  RegExp.prototype.global：返回一个布尔值，表示是否设置了 g 修饰符
 *  RegExp.prototype.multiline：返回一个布尔值，表示是否设置了 m 修饰符
 *  RegExp.prototype.flags：返回一个字符串，包含了已经设置的所有修饰符，按字母排序
 *
 *  RegExp.prototype.lastIndex：返回一个整数，表示下一次开始搜索的位置，该属性可读可写，但只在进行连续搜索时有意义
 *  RegExp.prototype.source：返回正则表达式的字符串形式（不包括反斜杠）
 *
 * 实例方法
 *  RegExp.prototype.test()
 *  返回一个布尔值，表示当前的正则是否能匹配参数字符串
 *  值得注意的是，如果正则表达式带有 g 修饰符，则每一次 test 方法都会从上一次结束的位置开始向后匹配，并且可以通过设置 lastIndex 来改变搜索的位置
 *  更要注意的是，使用该方法匹配时，不应该更换所查询的字符串，因为 lastIndex 更改了之后，再查询新的字符串会从上一次的 lastIndex 开始查询
 *  var reg = /a/g
 *  var str = "aaaaa"
 *  reg.lastIndex // 0
 *  reg.test(str) // true
 *  reg.lastIndex // 1
 *  reg.test(str) // true
 *  reg.lastIndex // 2
 *
 *  var count = 0
 *  while(/a/g.test("aaa")) count++
 *  以上会导致错误，因为每次的 while 都是新建的 /a/g，改为以下即可
 *  var count = 0
 *  var reg = /a/g
 *  while(reg.test("aaa")) count++
 *
 *  RegExp.prototype.exec()
 *  用来返回匹配结果，如果发现匹配就返回一个数组，成员是匹配成功的子字符串，否则返回 null
 *  如果正则表达式包含圆括号（组匹配），返回的数组会包括多个成员，第一个成员是整个匹配成功的结果，后面的成员时组匹配的结果，也就是说，第二个成员对应第一个括号，依此类推
 *  如果加上 g 修饰符，则可以多次使用 exec() 来匹配，下一次搜索的位置从上一次匹配成功的位置开始
 *  exec() 返回的数组还有两个属性
 *    input：整个原字符串
 *    index：整个正则表达式匹配成功的开始位置（从 0 开始）
 */

var reg = /(a)/g
var str = 'abc_abc_abc'
while (true) {
  var match = reg.exec(str)
  if (!match) break
  // console.log('#' + match.index + ':' + match[0])
}

/**
 * 字符串的实例方法
 *
 * String.prototype.match()
 * 返回一个数组，成员是所有匹配的子字符串
 * 与 RegExp 的 exec() 方法有些类似，但是如果是带有 g 修饰符，该方法会一次性返回所有匹配成功的结果
 * 此时设置 lastIndex 属性也无效，因为匹配总是从字符串的第一个字符开始
 * var str = "aaa"
 * str.match(/a/g) // ["a", "a", "a"]
 *
 * String.prototype.search()
 * 按给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置，如果没有任何匹配，返回 -1
 *
 * String.prototype.replace(search, replacement)
 * 按照给帝国内的正则表达式进行替换，返回替换后的字符串
 * 正则表达式若不加 g 修饰符，就替换第一个匹配成功的值，否则就替换所有的
 * 第二个参数可以使用美元符号 $ 来指代所替换的内容
 *  var str = "abc"
 *  $&：匹配的子字符串 str.replace(/b/, "$&") // "abc"
 *  $`：匹配结果前面的文本 str.replace(/b/, "$`") // "bc"
 *  $'：匹配结果后面的文本 str.replace(/b/, "$'") // "bcbc"
 *  $n：匹配成功的第 n 组（捕获组）内容，n 是从 1 开始的自然数 // str.replace(/(b)/, "$1") // "abc"
 *  $$：指代美元符号 $ // str.replace(/b/, "$$") // "a$b"
 * 第二个参数还可以是一个函数，将每一个匹配内容替换成函数返回值，
 *
 * String.prototype.split()
 * 按照给定规则进袭姑娘字符串分割，返回一个数组，包含分割后的各个成员
 */
