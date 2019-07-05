/**
 * 静态方法
 *
 * Array.isArray()
 * 返回一个布尔值，表示参数是非为数组，可以弥补 typeof 的不足
 */

/**
 * valueOf()、toString()
 * valueOf()：方法经过重写，直接返回该数组
 * toString()：方法返回数组的字符串形式，以 , 隔开，内部是通过调用 join 来实现的
 *
 * push()、pop()
 * push()：在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度
 * pop()：删除数组的最后一个元素，返回被删除的这个元素
 *
 * shift()、unshift()
 * shift()：删除数组的第一个元素，并返回被删除的这个元素
 * unshift()：用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度
 *
 * push()、pop() 两者结合使用，构成了 "后进先出" 的栈结构（stack）
 * push()、shift() 两者结合使用，构成了 "先进先出" 的队列结构（queue）
 *
 * join()
 * 用指定的分隔符将数组成员链接为一个字符串返回，不提供则默认用 , 分隔，若为 undefined、null、空位（empty）会被转成空字符串
 * 通过 call 还可以使类数组对象也调用该方法
 * Array.prototype.join.call("hello", "-") // "h-e-l-l-o"
 * var obj = { 0: "a", 1: "b", length: 2 }
 * Array.prototype.join.call(obj, "-") // "a-b"
 *
 * concat()
 * 用于多个数组的合并，也可以是其他类型的值作为参数，将成员添加到原数组后部，返回一个新数组，原数组不变
 *
 * reverse()
 * 用于颠倒排列数组元素，返回改编后的数组，该方法将改变原数组
 *
 * slice(start, end)
 * 用于提取目标数组的一部分，返回一个新数组，原数组不变，参数若为负数表示倒数计算位置
 * start：从 0 开始，包括 start 的那个元素
 * end：位置的元素本身不包括在内，若省略则一直返回到最后一个成员
 * 该方法的一个重要的作用是将类数组对象转为数组
 * Array.prototype.slice.call({ 0: "a", 1: "b", length: 2 }) // ["a", "b"]
 * Array.prototype.slice.call(arguments)
 * Array.prototype.slice.call(document.querySelectorAll("div"))
 *
 * splice(start, count, item1, item2, ...)
 * start：从 0 开始，包括 start 的那个元素，若为负数表示从倒数位置开始删除
 * count：被删除的个数
 * itemx：要插入的新元素
 * 用于删除原数组的一部分成员，并可以在删除的位置添加新的成员，返回值是被删除的元素，该方法将改变原数组
 *
 * sort(function)
 * 默认按照字典表顺序进行排序，也接受一个函数参数，该函数会被传入两个参数，分别是进行比较的两个成员，如果该函数的返回值大于 0，表示第一个元素在第二个元素后面，其他情况则第一个元素在第二个元素前面
 *
 * map(function)
 * 接受一个函数参数，把每一次结果组成一个新数组返回
 * 还接受第二个参数，用来绑定回调函数内部的 this 变量
 * 若数组有空位（empty），则会跳过该位置
 *
 * forEach(function)
 * 对数组成员依次执行参数函数，但是 forEach 没有返回值
 *
 * filter(function)
 * 用于过滤数组，接受一个函数作为参数，此函数返回 true 的成员会被组成新数组返回
 *
 * some(function)、every(function)
 * some()：只要一个成员返回值为 true 整个 some() 的返回值就是 true
 * every()：所有成员都返回 true，整个 every() 才返回 true
 *
 * reduce(function, init)、reduceRight(function, init)
 * 两者区别就是从左往右从右往左累加，还接受一个 init 值作为基础
 * function：接受四个参数，(pre, curr, index, arr)
 *
 * indexOf()、lastIndexOf()：内部使用 === 来判断，但是不能用来查找 NaN，因为 NaN 是唯一一个不等于自身的值
 * indexOf()：返回给定元素在数组中第一次出现的位置，如果没有出现则返回 -1
 * lastIndexOf()：返回给定元素在数组中最后一次出现的位置，如果没有则返回 01
 */
