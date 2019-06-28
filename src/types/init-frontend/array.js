/**
 * 数组的本质
 *
 * 数组实际上还是一个对象，所以也可以使用 for...in 的方法
 * JavaScript 语言规定，对象的键名一律为字符串，所以数组的键名也是字符串，之所以可以用数值读取，是因为非字符串的键名会被转为字符串
 * var arr = ["a", "b", "c"]
 * arr[1.00] // "a"
 * arr[1] // "a"
 * String(1.00) // "1"
 *
 * length 属性
 * JavaScript 使用一个 32 位整数保存数组的元素个数，也就是说，数组成员最多只有 2^32-1（4294967295）个，也就是说 length 的最大值就是 4294967295
 * 如果数组的键名是超出范围的数值，该键名会自动转为字符串
 * var arr = []
 * arr[-1] = "a"
 * arr[Math.pow(2, 32)] = "b"
 * arr.length // 0
 * arr[-1] // "a"
 * arr[4294967296] // "b"
 */

/**
 * in 运算符
 *
 * var arr = ["a", "b", "c"]
 * 2 in arr // true
 * "2" in arr // true
 * "4" in arr // false
 *
 * var arr = []
 * arr[100] = "a"
 * 100 in arr // true
 * 1 in arr // false
 * 如上例子，如果某个位置是空位（hole），in 回返回 false
 */

/**
 * 数组的空位（hole）
 *
 * 空位不影响 length
 * var arr = [1, , 3]
 * arr.length // 3
 *
 * delete 删除元素会产生空位
 * var arr = [1, 2, 3]
 * delete arr[1]
 * arr // [1, , 3]
 *
 * 值得注意的是，数组的某个位置是空位，和某个位置是 undefined 是不同的，即使访问空位元素会返回 undefined
 * 如果是空位，forEach、for...in、Object.keys 遍历时，空位都会被跳过
 * var arr = [, , ,]
 * arr.forEach(function (value) { console.log(value) }) // 不产生任何输出
 * for (var i in arr) { console.log(i) } // 不产生任何输出
 * Object.keys(arr) // []
 * 如果是 undefined，则不会跳过
 * var arr = [undefined, undefined, undefined]
 * arr.forEach(function (value) { console.log(value) }) // undefined * 3
 * for (var i in arr) { console.log(i) } // "0" "1" "2"
 * Object.keys(arr) // ["0", "1", "2"]
 */

/**
 * 类数组对象
 *
 * 如果一个对象的所有键名都是正整数或零，并且有 length 属性，那么这个对象就称为 "类数组对象"（array-like object）
 * 
 */
