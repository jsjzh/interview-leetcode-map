// TODO https://wangdoc.com/javascript/types/string.html
/**
 * 输出多行字符串，利用多行注释的变通方法
 */
var multiLine = function() {
  /*
  line 1
  line 2
  line 3
  */
}
  .toString()
  .split('\n')
  .slice(2, -2)
  .join('\n')
console.log(multiLine)

/**
 * 转义
 *
 * 反斜杠在字符串内有特殊含义，用来表示一些特殊字符，又称为转义符
 *  \0：null（\u0000）
 *  \b：后退键（\u0008）
 *  \f：换页符（\u000C）
 *  \n：换行符（\u000A）
 *  \r：回车键（\u000D）
 *  \t：制表符（\u0009）
 *  \v：垂直制表符（\u000B）
 *  \'：单引号（\u0027）
 *  \"：双引号（\u0022）
 *  \\：反斜杠（\u005C）
 * 反斜杠的特殊用法
 *  \HHH
 *    \ 后面紧跟三个八进制数（000 到 377），代表一个字符，HHH 对应该字符的 Unicode 码点，比如 \251 表示版权符号，显然，这种方法只能输出 256 种字符
 *  \xHH
 *    \x 后面紧跟两个十六进制数（00 到 FF），代表一个字符，HH 对应该字符的 Unicode 码点，比如 \xA9 表示版权符号，这种方法也只能输出 256 种字符
 *  \uXXXX
 *    \u 后面紧跟四个十六进制数（0000 到 FFFF），代表一个字符，XXXX 对应该字符的 Unicode 码点，比如 \u00A9 表示版权符号
 * 如果在非特殊字符前面使用反斜杠，则反斜杠被忽略
 */
