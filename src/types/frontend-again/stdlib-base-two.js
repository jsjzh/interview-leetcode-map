/**
 * Math 对象
 *
 * 静态属性
 *  Math.E：常数 e
 *  Math.LN2：2 的自然对数
 *  Math.LN10：10 的自然对数
 *  Math.LOG2E：以 2 为底的 e 的对数
 *  Math.LOG10E：以 10 为底的 e 的对数
 *  Math.PI：常数 π
 *  Math.SQRT1_2：0.5 的平方根
 *  Math.SQRT2：2 的平方根
 *
 * 静态方法
 *  Math.abs()：绝对值
 *
 *  Math.max()：最大值，接受数个参数，返回最大的那个值
 *  Math.min()：最小值，接受数个参数，返回最小的那个值
 *
 *  Math.floor()：向下取整，返回小于参数值的最大整数
 *  Math.ceil()：向上取整，返回大于参数值的最小整数
 *    function toInt(x) { x = Number(x); return x < 0 ? Math.ceil(x) : Math.floor(x) }
 *    以上是总是返回数值的整数部分的函数，也可以用 ~~123.45 实现
 *  Math.round()：四舍五入
 *    在处理负数的时候，需要注意对 0.5 的处理
 *    Math.round(-1.5) // -1
 *
 *  Math.pow()：指数运算，第一个参数为底数，第二个参数为幂的指数值
 *  Math.sqrt()：平方根，如果参数为负，返回 NaN
 *
 *  Math.log()：自然对数
 *  Math.exp()：e 的指数
 *
 *  Math.sin()：返回参数的正弦（参数为弧度值）
 *  Math.cos()：返回参数的余弦（参数为弧度值）
 *  Math.tan()：返回参数的正切（参数为弧度值）
 *  Math.asin()：返回参数的反正弦（返回值为弧度值）
 *  Math.acos()：返回参数的反余弦（返回值为弧度值）
 *  Math.atan()：返回参数的反正切（返回值为弧度值）
 *
 *  Math.random()：伪随机数，范围在 0-1 之间，可能等于 0，但一定小于 1
 */

// 任意范围的随机数生成
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

// 任意范围的随机整数
function getRandomInt(min, max) {
  min = ~~min
  max = ~~max
  return ~~(Math.random() * (max - min + 1)) + min
}

// 返回随机字符串
function randomStr(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz'
  ALPHABET += '0123456789-_'
  var str = ''
  for (var i = 0; i < length; i++) {
    var rand = ~~(Math.random() * ALPHABET.length)
    str += ALPHABET.slice(rand, rand + 1)
  }
  return str
}

/**
 * Date 对象
 *
 * 以国际标准时间（UTC）1970 年 1 月 1 日 00:00:00 作为时间的零点，可以表示的时间范围是前后各一亿天（单位为毫秒）
 *
 * 作为普通函数直接调用，无论有没有参数，都会直接返回当前时间
 * Date() // "Sun Jul 07 2019 15:56:02 GMT+0800 (中国标准时间)"
 * Date(2000, 1, 1) // "Sun Jul 07 2019 15:56:02 GMT+0800 (中国标准时间)"
 *
 * 作为构造函数使用，返回一个 Date 对象的实例，如果不加参数，实例求值等于当前时间，他有一个独特的地方，其他对象求值的时候，都默认调用 valueOf() 方法，但 Date 实例求值的时候，默认调用 toString() 方法
 * 作为构造函数时，可以接受多种格式的参数，返回一个该参数对应的时间实例
 * 参数的说明
 *  第一种，参数是从时间零点开始计算的毫秒数，可以为负，表示向时间零点前计算
 *  第二种，参数为日期字符串
 *    只要能被 Date.parse() 解析的字符串都能当作参数
 *  第三种，参数为多个整数，代表年、月、日、时、分、秒、毫秒，且年、月不能省略，这表示至少要两个参数，如果只有一个参数年，会被当成第一种情况解析
 *    参数为负则表示扣去的时间
 *    年：使用四位数年份，如果写成两位数或个位数，则自动加沙给你 1900，如 10 表示 1910，如果为负数表示公元前
 *    月：0 表示一月，依此类推，11 表示 12 月
 *    日：1 到 31
 *    时：0 到 23
 *    分：0 到 59
 *    秒：0 到 59
 *    毫秒：0 到 999
 *  值得注意的是，如果超过了正常范围，会自动往前往后折算，比如输入了 2019 年 2 月 29 日，则会得到 2019 年 3 月 1 日
 *
 * 静态方法
 *  Date.now()
 *  返回当前时间距离时间零点（1970 年 1 月 1 日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以 1000
 *
 *  Date.parse()
 *  日期字符串应该符合 RFC 2822 和 ISO 8061 两个标准，即 YYYY-MM-DDTHH:mm:ss.sssZ 格式，Z 表示时区，但其他格式也可以被解析，如果解析失败会返回 NaN
 *
 *  Date.UTC()
 *  接受年、月、日、时、分、秒、毫秒作为参数，返回该时间距离时间零点的毫秒数，和 Date() 的构造函数类似，区别是使用 Date.UTC() 的参数会被解释为 UTC 时间（世界标准时间），构造函数的参数会被解释为当前时区的时间
 *  Date.UTC(2019, 6, 7) // 1562457600000
 *  +new Date(2019, 6, 7) // 1562428800000
 *  如上，这两个时间相差了 8 小时，就是中国所在时区差
 *
 * 实例方法
 *  Date.protptype.valueOf()
 *  返回实例对象距离时间零点对应的毫秒数，该方法等同于 getTime()，在需要的时候，该方法会自动调用，比如 +new Date()
 *
 * <!-- to -->
 *
 *  Date.prototype.toString()
 *  返回一个完整的日期字符串
 *
 *  Date.prototype.toUTCString()
 *  返回对应的 UTC 时间，在中国调用就是比北京时间晚 8 小时
 *
 *  Date.prototype.toISOString()
 *  返回对应的 ISO 8061 写法
 *
 *  Date.prototype.toJSON()
 *  返回一个符合 JSON 格式的 ISO 日期字符串，与 toISOString() 返回结果相同
 *
 *  Date.prototype.toDateString()
 *  返回日期字符串（不含时、分、秒）
 *
 *  Date.prototype.toTimeString()
 *  返回时间字符串（不含年、月、日）
 *
 *  本地时间，这三个方法都有两个可选参数，locales，options
 *    Date.prototype.toLocaleString()
 *    Date.prototype.toLocaleDateString()
 *    Date.prototype.toLocaleTimeString()
 *  locales：指定所用语言
 *  options；对输出的时间进行配置，下面的设置是，星期和月份为完整文字，年份和日期为数字，时区为上海，小时周期为 24
 *    weekday: "long"
 *    year: "numeric"
 *    month: "long"
 *    day: "numeric"
 *    timeZone: "Asia/Shanghai"
 *    timeZoneName: "long"
 *    hour12: true
 *
 * <!-- get -->
 *
 *  Date.prototype.getTime()
 *  返回距离标准时间的毫秒数，和 valueOf() 一样
 *
 *  Date.prototype.getFullYear()
 *  返回四位的年份
 *
 *  Date.prototype.getMonth()
 *  返回月份，0 表示 1 月，11 表示 12 月
 *
 *  Date.prototype.getDate()
 *  返回实例对象对应每个月的几号，从 1 开始
 *
 *  Date.prototype.getDay()
 *  返回星期几，星期日为 0，星期一 为 1
 *
 *  Date.prototype.getHours()
 *  返回小时（0-23）
 *
 *  Date.prototype.getMinutes()
 *  返回分钟（0-59）
 *
 *  Date.prototype.getSeconds()
 *  返回秒（0-59）
 *
 *  Date.prototype.getMilliseconds()
 *  返回毫秒（0-999）
 *
 *  Date.prototype.getTimezoneOffset()
 *  返回当前时间与 UTC 的时区差异，以分钟表示，考虑到了夏令时（一般在天亮早的夏季人为将时间调快一小时，可以使人早起早睡，减少照明量，以充分利用光照资源，从而节约照明用电，各个采纳夏令时的国家具体规定不同，1986 年中国启动夏令时，1992 年停止实行夏令时）
 *
 *  UTC 时间
 *    Date.prototype.getUTCDate()
 *    Date.prototype.getUTCFullYear()
 *    Date.prototype.getUTCMonth()
 *    Date.prototype.getUTCDay()
 *    Date.prototype.getUTCHours()
 *    Date.prototype.getUTCMinutes()
 *    Date.prototype.getUTCSeconds()
 *    Date.prototype.getUTCMilliseconds()
 *
 * <!-- set -->
 *
 *  以下方法都返回改变后的毫秒时间戳
 *
 *  Date.prototype.setFullYear(year, month, date)
 *  设置四位年份、月（0-11）、日（1-31）
 *
 *  Date.prototype.setMonth()
 *  设置月份
 *
 *  Date.prototype.setDate(date)
 *  设置当前实例月份对应的几号
 *
 *  Date.prototype.setHours(hour, min, sec, ms)
 *  设置时（0-23）、分（0-59）、秒（0-59）、毫秒（0-999）
 *
 *  Date.prototype.setMinutes(min, sec, ms)
 *  设置分、秒、毫秒
 *
 *  Date.prototype.setSeconds(sec, ms)
 *  设置秒、毫秒
 *
 *  Date.prototype.setMilliseconds()
 *  设置毫秒
 *
 *  Date.prototype.setTime()
 *  设置毫秒时间戳
 *
 *  值得注意的是，和 get 类方法不同的是，少了一个 setDay，设置星期几的方法，因为星期几时通过计算出来的
 *
 *  UTC 时间
 *    Date.prototype.setUTCDate()
 *    Date.prototype.setUTCFullYear()
 *    Date.prototype.setUTCHours()
 *    Date.prototype.setUTCMilliseconds()
 *    Date.prototype.setUTCMinutes()
 *    Date.prototype.setUTCMonth()
 *    Date.prototype.setUTCSeconds()
 */

// 计算本年度还剩下多少天
function leftDays() {
  var today = new Date()
  var lastTime = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999)
  var msDay = 24 * 3600 * 1000
  return Math.round((lastTime - today) / msDay)
}

console.log(leftDays())
