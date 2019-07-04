/**
 * 比较运算符
 *
 * 比较两个值的大小，然会一个布尔值，需要注意的是，比较运算符可以比较各种类型的值，不仅仅是数值
 *
 * > 大于运算符
 * < 小于运算符
 * <= 小于或等于运算符
 * >= 大于或等于运算符
 * == 相等运算符
 * === 严格相等运算符
 * != 不相等运算符
 * !== 严格不相等运算符
 *
 * 这八个运算符分成两类，相等比较和非相等比较，非相等比较先看两个运算子是否都是字符串，如果是，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则将两个运算子都转成数值，再比较数值大小
 */

/**
 * 非相等运算符
 *
 * 字符串的比较
 * 从左往右依次比较 Unicode 码点
 * "cat" > "dog" // false
 * "cat" > "Cat" // true
 * "大" > "小" // false
 *
 * 非字符串的比较
 *  原始类型，先转成数值再比较
 *    5 > "4" // true
 *    true > false // true
 *    2 > true // true
 *  需要注意的是与 NaN 比较，任何值（包括 NaN 本身）与 NaN 比较，返回的都是 false
 *    1 > NaN // false
 *    1 <= NaN // false
 *    "1" > NaN // false
 *    "1" <= NaN // false
 *    NaN > NaN // false
 *    NaN <= NaN // false
 *
 *  对象类型，先转为原始类型的值再比较，先调用 valueOf()，如果返回的还是对象，再调用 toString()，Date 比较特别，是直接调用 toString()
 *    var foo = [2]
 *    foo > "11" // true ===> [2].valueOf().toString() > "11" ===> "2" > "11"
 *    foo.valueOf = function() { return "1" }
 *    foo > "11" // false ===> [2].valueOf() > "11" ===> "1" > "11"
 *    [2] > [1] // true ===> [2].valueOf().toString() > [1].valueOf().toString() ===> "2" > "1"
 *    [2] > [11] // true ===> [2].valueOf().toString() > [11].valueOf().toString() ===> "2" > "11"
 *    { x: 2 } >= { x: 1 } // true ===> { x: 2 }.valueOf().toString() >= { x: 1 }.valueOf().toString() === "[object Object]" >= "[object Object]"
 */

/**
 * 相等运算符
 *
 * == 和 ===，在比较两个不是同一类型的值时，=== 会直接返回 false，== 会将他们转换成同一类型，再用 === 比较
 *
 * 严格相等运算符
 *
 *  比较两个类型不同的值，直接返回 false
 *    1 === "1" // false
 *
 *  同一类的原始类型值（数值、字符串、布尔值）
 *    1 === 0x1 // true
 *    NaN === NaN // false
 *    +0 === -0 // true
 *
 *  复合类型值，比较是否指向用一个地址
 *    {} === {} // false
 *    [] === [] // false
 *
 *    var foo = {}
 *    var bar = foo
 *    foo === bar // true
 *    foo > bar /// false ===> foo.valueOf().toString() > bar.valueOf().toString() ===> "[object Object]" > "[object Object]"
 *    对于两个对象的比较，严格相等运算符比较的是地址，而大于或小于运算符比较的是值
 *
 *  undefined 和 null
 *  分别于自身相等
 *
 * 严格不相等运算符
 * 算法就是先求严格相等运算符的结果，再返回其相反值
 *
 * 相等运算符
 *
 *  原始类型值，会转换成数值再进行比较
 *    1 == true // true ===> 1 == Number(true)
 *    0 == false // true ===> 0 == Number(false)
 *    "true" == true // false ===> Number("true") == true ===> NaN == true
 *
 *  对象（广义的对象，包括数组和函数）与原始类型值比较，对象转换成原始类型的值再比较
 *    对象与数值比较时，对象转为数值
 *    [1] == 1 // true ===> Number([1].valueOf().toString()) == 1
 *    对象与字符串比较时，对象转为字符串
 *    [1, 2] == "1,2" // true ===> [1, 2].valueOf().toString() == "1,2"
 *    对象与布尔值比较时，两边都转为数值
 *    [1] == true // true ===> Number([1].valueOf().toString()) == true
 *    [2] == true // false ===> Number([2].valueOf().toString()) == false
 *
 *  undefined 和 null
 *    他们和其他类型的值比较时都为 false，互相比较时为 true
 *
 * 不相等运算符
 * 算法就是先求相等运算符的结果，再返回其相反值
 */
0 == ''
0 == '0'
2 == true
2 == false
false == 'false'
false == '0'
false == undefined
false == null
null == undefined
' \t\r\n ' == 0
