/**
 * Regexp 对象
 *
 * .*?
 * .+?
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
 * 第二个参数还可以是一个函数，将每一个匹配内容替换成函数返回值，函数接受以下参数
 *  第 1 个参数，是匹配到的字符串
 *  第 2 个到第 n-2 个参数，表示捕获组的字符串
 *  第 n-1 个参数，表示第一个参数所在的位置
 *  第 n 个参数，表示原字符串
 *
 * String.prototype.split()
 * 按照给定规则进袭姑娘字符串分割，返回一个数组，包含分割后的各个成员
 *  如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回
 *  正则表达式默认贪婪匹配，所以会以 aaa 为第一分隔符
 *  "aaa*a*".split(/(a*)/) // ["", "aaa", "*", "a", "*"]
 *  "aaa*a*".split(/(a*?)/) // ["a", "", "a", "", "a", "", "*", "", "a", "", "*"]
 */

// 模板字符串
var prices = {
  p1: '$1.99',
  p2: '$2.99',
  p3: '$3.99'
}
var template = '<p>{{p1}}</p><span>{{p2}}</span><span>{{p3}}</span>'

var foo = template.replace(/(<(span|p)>)\{\{(.*?)\}\}(<\/(\2)>)/g, function(match, $1, $2, $3, $4) {
  return $1 + prices[$3] + $4
})
// console.log(foo) // "<p>$1.99</p><span>$2.99</span><span>$3.99</span>"

/**
 * 匹配规则
 *
 * 字面量字符
 *  /dog/.test("cat dog")
 *
 * 元字符
 *  点字符（.）：匹配除回车（\r）、换行（\n）、行分隔符（\u2028）、段分隔符（\u2029）以外的所有字符
 *  需要注意的是，对于码点大于 0xFFFF 的字符，点字符不能正确匹配，会认为这是两个字符
 *  "𠮷".match(/./g) // ["�", "�"]
 *  "我".match(/./g) // ["我"]
 *
 *  位置字符（^、$）：表示字符串开始位置、结束位置
 *
 *  选择符（|）：在正则表达式中表示 "或关系"（OR）
 *
 *  转义符（\）：想匹配元字符本身的字符串，需要在其前面加转义符
 *  需要加转义符的有 12 个字符：^、.、[、$、(、)、|、*、+、?、{、\
 *  需要注意的是，如果是用 new RegExp 来生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次
 *
 *  特殊字符
 *    \cX：表示 Ctrl-[X]，其中的 X 是 A-Z 之中任一个英文字母，用来匹配控制字符
 *    [\b]：匹配退格键（U+0008），不要与 \b 混淆
 *    \n：匹配换行键
 *    \r：匹配回车键
 *    \t：匹配制表符 tab（U+0009）
 *    \v：匹配垂直制表符（U+000B）
 *    \f：匹配换页符（U+000C）
 *    \0：匹配 null 字符（U+0000）
 *    \xhh：匹配一个以两位十六进制数（\x00-\xFF）表示的字符
 *    \uhhhh：匹配一个以四位十六进制数（\u0000-\uFFFF）表示的 Unicode 字符
 *
 *  字符类
 *    字符类表示有一系列字符可供选择，只要匹配其中一个就行了，就像 [xyz] 匹配 x、y、z 之中任意一个
 *    有两个字符在中括号中有特别意义
 *      脱字符（^）：表示除了字符类中的字符，其他都可以匹配，需要注意的是，该字符只在字符类第一个位置才有效
 *      如果方括号内没有其他字符，就表示匹配一切字符，包括换行符，比 . 匹配的还多 [^]
 *        /[^abc]/.test("hello") // true
 *        /[^abc]/.test("abc") // false
 *      连字符（-）：对于连续的字符所提供的简写形式
 *        [0-9.,]：
 *        [0-9a-fA-F]：
 *        [a-zA-Z0-9-]：
 *        [1-31]：代表 1 到 3
 *        [\u0128-\uFFFF]：Unicode 码点在 0128 到 FFFF 之间的所有字符
 *        [A-z]：在 ASCII 编码中，大写字母与小写字母之间还有其他字符，结果不能如所愿
 *
 *  预定义模式
 *    \d：匹配 0-9 之间任一数字，相当于 [0-9]
 *    \D：匹配除 0-9 以外的字符，相当于 [^0-9]
 *    \w：匹配任意的字母、数字、下划线，相当于 [A-Za-z0-9_]
 *    \W：除字母、数字、下划线以外的字符，相当于 [^A-Za-z0-9_]
 *    \s：匹配空格（包括换行符、制表符、空格符等），相当于 [ \t\r\n\v\f]
 *    \S：匹配非空格的字符，相当于 [^ \t\r\n\v\f]
 *    \b：匹配词的边界
 *    \B：匹配非词边界，即在词的内部
 *
 *    var reg = /\bworld/
 *    reg.test('hello world') // true
 *    reg.test('hello-world') // true
 *    reg.test('helloworld') // false
 *
 *    var regPlus = /\Bworld/
 *    regPlus.test('hello world') // false
 *    regPlus.test('hello-world') // false
 *    regPlus.test('helloworld') // true
 *
 *  重复类
 *    模式的精确匹配次数，使用大括号表示
 *      {n}：表示恰好重复 n 次
 *      {n,}：表示至少重复 n 次
 *      {n,m}：表示重复不少于 n 次，不多于 m 次
 *
 *  量词符
 *    用来设定某个模式出现的次数
 *      ?：表示某个模式出现 0 次或 1 次，等同于 {0,1}
 *      *：表示某个模式出现 0 次或多次，等同于 {0,}
 *      +：表示某个模式出现 1 次或多次，等同于 {1,}
 *
 *  贪婪模式
 *    ? * + 三个量词符，默认情况都是最大可能匹配，即匹配直到下一个字符不满足匹配规则位置，这种被称为贪婪模式
 *    如果要改成非贪婪模式，可以在量词符后面就爱一个问号
 *      +? *? ??
 *      "abb".match(/a*b/) // ["abb"]
 *      "abb".match(/a*?b/) // ["ab"]
 *      "abb".match(/a?b/) // ["abb"]
 *      "abb".match(/a??b/) // ["ab"]
 *
 *  修饰符
 *    g 修饰符：不含 g 修饰符时，每次都是从字符串头部开始匹配，加了 g 之后，每次都从上一次匹配成功的位置开始匹配
 *    i 修饰符：加了 g 之后不考虑大小写
 *    m 修饰符：该修饰符会修改 ^ 和 $ 的行为，即 ^ 和 $ 会识别换行符
 *      /world$/.test("hello world\n") // false
 *      /world$/m.test("hello world\n") // true
 *
 *  组匹配
 *  /dog+/.test("dogg") // true
 *  /(dog)+/.test("dogdog") // true
 *
 *  "abcabc".match(/(.)b(.)/) // ["abc", "a", "c"]
 *  "abcabc".match(/(.)b(.)/g) // ["abc", "abc"]
 *  如上例子可见，使用组匹配的时候不宜同时使用 g 修饰符，否则 match 不会捕获分组的内容，此时就要使用 exec() 来进行循环匹配
 *  var str = 'abcabc'
 *  var reg = /(.)b(.)/g
 *  while (true) {
 *    var result = reg.exec(str)
 *    if (!result) break
 *    console.log(result)
 *  }
 *
 * 在正则表达式内部，还可以使用 \x 来表示引用括号匹配的内容，x 是从 1 开始的自然数，表示对应的顺序的括号
 * /(.)b(.)\1b\2/.test("abcabc") // true
 */

// 匹配网页标签
var tagNameReg = /<([^>]+)>[^<]*<\/\1>/
var str = '<b>bold</b>'
tagNameReg.exec(str)[1] // b

// 捕获带有属性的标签
var tagReg = /<(\w+)([^>]*)>(.*?)<\/\1>/g
var html = "<b class='hello' name='test'>Hello</b><i class='world'>world</i>"
while (true) {
  var result = tagReg.exec(html)
  if (!result) break
  // console.log(result)
}

/**
 * 非捕获组
 * (?:x) 称为非捕获组，表示不返回该组匹配的内容，并且也不计入可以在正则表达式中使用的 \x 的个数
 */

var reg = /(?:.)b(.)(.)b\1/
reg.exec('abcabc') // ["abcabc", "c", "a"]

var urlReg = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/
urlReg.exec('http://google.com/') // ["http://google.com/", "http", "google.com", "/"]

var urlPro = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/
urlPro.exec('http://google.com/') // ["http://google.com/", "google.com", "/"]

/**
 * 先行断言
 * x(?=y) 称为先行断言，x 只有在 y 前面才匹配，y 不会被记入返回结果
 */

// 匹配后面跟着百分号的数字
var reg = /\d+(?=%)/
reg.test('1%') // true

var reg = /b(?=c)/
reg.exec('abc') // ["b"]

/**
 * 先行否定断言
 * x(?!y) 称为先行否定断言，x 只有不再 y 前面才匹配，有不会被记入返回结果
 */

//  匹配后面没有跟着百分号的数字
var reg = /\d+(?!%)/
reg.test('1%') // false

var reg = /b(?!c)/
reg.exec('abd') // ["b"]
