/**
 * void 运算符
 *
 * 该运算符的作用是执行一个表达式，然后不返回任何值，或者说返回 undefined，主要作用是浏览器的书签工具，以及在超链接中防止网页跳转等等
 * void 0
 * void(0)
 * 相比较，第二种更好，因为 void 运算符的优先级很高，不使用 void 的话，void 4 + 7 实际意义是 (void 4) + 7
 * <a href="http://example.com" onclick="mark(); return false;">不要跳转</a>
 * <a href="javascript: void(mark())">不要跳转</a>
 */

/**
 * 逗号运算符
 *
 * 逗号运算符对于两个表达式求值，并返回后一个表达式的值，该运算符的用途是在返回一个值之前进行一些辅助操作
 * "a", "b" // "b"
 * var foo = 0
 * var bar = (foo++, 10)
 * bar // 10
 */

/**
 * 优先级
 *
 * 记住所有运算符的优先级是非常难的，也是没有必要的，因此建议总是使用圆括号来保证运算顺序清晰可读
 */

/**
 * 左结合与右结合
 *
 * 对于优先级相同的运算符，大多数情况计算顺序都是从左往右（左结合），但也有少数运算符是从右往左的（右结合）,像是赋值运算符 =，三元条件运算符 ?:，指数运算符 **
 * w = x = y = z ===> w = (x = (y = z))
 * q = a ? b : c ? d : e ? f : g ===> q = a ? b : (c ? d : (e ? f : g))
 * a ** b ** c ===> a ** (b ** c)
 */