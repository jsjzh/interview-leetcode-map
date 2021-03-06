/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-20 21:19:51
 * @LastEditTime: 2019-05-10 10:52:01
 * @Description: 这里会收集平时看到的面试题，并附上自己的解答，基本上都会补充上来源和说明还有示例
 */

/**
 * 来源：https://juejin.im/post/5c90f573e51d450a7d7dfc75
 *
 * 标题：特定语法匹配替换
 * 说明：匹配字符串中形如 =g文字文字= 的语法，并将相应部分转化为对应的标签文字文字
 * 示例：
 *  transform('=g1.18 进入开发='); // <g>1.18 进入开发</g>
 *  transform('=g1.23 联调(-1)=，=g1.25 发布(+1)=')；// <g>1.23 联调(-1)</g>，<g>1.25 发布(+1)</g>
 *  transform('1.25 发布')； // 1.25 发布
 * @param {String} str
 */
function transform(str) {
  return str.replace(/\=g(.+?)\=/g, $0 => $0.replace('=g', '<g>').replace('=', '</g>'))
}
// console.log(transform('=g1.23 联调(-1)='))
// console.log(transform('=g1.23 联调(-1)=，=g1.25 发布(+1)='))
// console.log(transform('1.25 发布'))

/**
 * 来源：https://juejin.im/post/5c90f573e51d450a7d7dfc75
 *
 * 标题：合并数组中相邻且重复的元素
 * 说明：请实现一个函数 merge，传入一个数组，合并数组中【相邻且重复】的元素
 * 示例：
 *  merge([3,2,2,4,5,5,6,2,1]); // 输出[3,2,4,5,6,2,1]
 *  merge([3,2,3]); // 输出[3,2,3]
 *  merge([2,2,3]); // 输出[2,3]
 * @param {Number[]} arr
 */
function merge(arr) {
  for (let ind = 0; ind < arr.length; ind++) {
    if (arr[ind] === arr[ind + 1]) arr.splice(ind, 1)
  }
  return arr
}
// console.log(merge([3, 2, 2, 4, 5, 5, 6, 2, 1]))
// console.log(merge([3, 2, 3]))
// console.log(merge([2, 2, 3]))

/**
 * 来源：https://juejin.im/post/5c90f573e51d450a7d7dfc75
 *
 * 标题：函数组合运行
 * 说明：实现一个方法，可将多个函数方法按从左到右的方式组合运行
 * 示例：
 *  const add = x => x + 1
 *  const multiply = (x, y) => x * y
 *  const multiplyAdd = composeFunctions(multiply, add)
 *  multiplyAdd(3, 4) // 返回 13
 * @param  {...Function} args
 */
function composeFunctions(...args) {
  return function(...params) {
    for (let ind = 0; ind < args.length; ind++) {
      params = Array.isArray(params) ? args[ind].apply(null, params) : args[ind].call(null, params)
    }
    return params
  }
}
// const add = x => x + 1
// const multiply = (x, y) => x * y
// const multiplyAdd = composeFunctions(multiply, add)
// console.log(multiplyAdd(3, 4))

/**
 * 来源：微信群
 *
 * 需求：
 *  把 arrB 里的不同项添加至 arrA 里
 *  要求 arrA 里不出现重复项
 *  求个最优解
 *
 * @param {Object[]} arrA
 * @param {Object[]} arrB
 */
function mergeObjectArray(arrA, arrB) {
  return arrB.reduce((pre, curr) => {
    if (pre.findIndex(item => item.id === curr.id) !== -1) return pre
    else return [...pre, curr]
  }, arrA)
}
// let arrA = [{ id: 1 }, { id: 2 }, { id: 3 }]
// let arrB = [{ id: 3 }, { id: 4 }, { id: 5 }]
// console.log(mergeObjectArray(arrA, arrB))

/**
 * 来源：https://juejin.im/post/5abee67df265da2398676322
 *
 * 需求：
 * 对一维数组，根据 type 类型分组成二维数组
 *
 * 输入的参数可能是空数组 []，空对象 null，undefined，数字，字符串等异常值
 * 也可能是结构为 [{ type, content}] 的有效值
 * 甚至是 [null, null, (type, content)] 等有效和非法值混合的数据
 *
 * 当输入数据不合法时，输出空数组 []
 * 当输入数据有效时（请先过滤数组里的异常元素），然后将相同 type 值的元素合并
 * 形成新元素 {"type": "A", "contents": [content1, content2]}
 * 其中，contents 为一个数组，元素为所有 type 值相同的 content 值
 * 注意，输出的是一个标准 JSON 格式
 */
function dimensionality(arr) {
  if (!Array.isArray(arr) || !arr.length) return []
  return arr.reduce((pre, curr) => {
    if (!curr || !curr.type) return pre
    let index = pre.findIndex(item => item.type === curr.type)
    if (index === -1) {
      pre.push({ type: curr.type, content: [curr.content] })
    } else {
      pre[index].content = [...pre[index].content, curr.content]
    }
    return pre
  }, [])
}
// let dimensionality_input = [ null, 2, 'test', undefined, { type: 'product', content: 'product1' }, { type: 'product', content: 'product2' }, { type: 'tag', content: 'tag1' }, { type: 'product', content: 'product3' }, { type: 'tag', content: 'tag2' } ]
// console.log(dimensionality(dimensionality_input))

/**
 * 来源：创邻面试题
 * 需求：
 * 想买尽可能多的种类，每种只买一件，同时总价格还不能超过预算上限
 * 第一个是预算上限
 * 第二个是用空格分隔的一组数字，代表每种物品的价格
 * 所有数字都为正整数并且不会超过10000
 *
 * @param {Number} total 限制价格
 * @param {String} prices 商品价格，用 ' ' 分割
 */
function calCases(total, prices) {
  let arr = prices
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)
  let sum = 0
  for (let ind = 0; ind < arr.length; ind++) {
    const price = arr[ind]
    let oldSum = sum
    sum += price
    if (sum >= total) {
      sum = oldSum
      break
    }
  }
  return sum
}
// console.log(calCases(188, '50 42 9 15 105 63 14 30'))

/**
 * 来源：创邻面试题
 *
 * 需求：
 * 构建一个 n * n 的格子，默认背景色都是白色
 * 鼠标指针指上去的格子底色要变成红色，鼠标移出时复原
 * 鼠标点击格子时背景色固定为蓝色，指针hover时也不变红，再次点击时复原成未点击的状态
 * 格子大小可用css控制,底色变化用js实现
 *
 * @param {Number} n 格子行数和每行个数
 */
function createBlock(n) {
  function handleMouseEnter(event) {
    this.style.backgroundColor = 'red'
  }
  function handleMouseLeave(event) {
    this.style.backgroundColor = 'white'
  }
  function handleClick(event) {
    let { isClick } = this.dataset
    if (isClick === 'true') {
      this.style.backgroundColor = 'white'
      this.setAttribute('data-isClick', false)
      this.addEventListener('mouseenter', handleMouseEnter)
      this.addEventListener('mouseleave', handleMouseLeave)
    } else {
      this.setAttribute('data-isClick', true)
      this.style.backgroundColor = 'blue'
      this.removeEventListener('mouseenter', handleMouseEnter)
      this.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  let div = document.createElement('div')
  for (let i = 0; i < n; i++) {
    let ul = document.createElement('ul')
    for (let j = 0; j < n; j++) {
      let li = document.createElement('li')
      li.style.cssText = ';display:inline-block;width:50px;height:50px;background-color:white;'
      li.addEventListener('mouseenter', handleMouseEnter)
      li.addEventListener('mouseleave', handleMouseLeave)
      li.addEventListener('click', handleClick)
      ul.appendChild(li)
    }
    div.appendChild(ul)
  }
  return div
}
// document.documentElement.appendChild(createBlock(5))

/**
 * 来源：微信群
 *
 * 需求：
 * 两个人正在玩猜数游戏，A 心里想两个不相等的正数，然后把两个正数的和 Y 告诉 B
 * A 声称心里想的两个数都不大于 X，让 B 猜这两个数是多少
 * B 每猜一次，A 都会告诉他猜对还是猜错了，游戏直到猜对为止
 * 为了加大难度，A 可能会误报 X 的大小，如果 B 判断出 X 是错误的，就可以直接获得答案
 * 最坏的情况下，B 需要猜多少次才能猜到答案？
 *
 * X1 + X2 = Y
 * X1 <= X && X2 <= X
 * X1 !== X2
 * X1,X2 >= 1 && Y <= 10^14
 *
 * @param {Number} x 两个数不大于的数
 * @param {Number} y 两个数之和
 */
function guessNumber(x, y) {
  if (x < y / 2) return 1
  return y % 2 === 0 ? y / 2 : (y + 1) / 2
}

/**
 * 来源：微信群
 *
 * 需求：
 * 怼给定的字符串进行排序，字符串中国呢每个单词都包含一个数字，此数字是单词再结果中应具有的位置
 * 数字可以是 1-9，因此 1 是第一个单词（不是 0）
 * 如果输入为空，则返回空字符串，输入的 string 中的单词只包含有效的连续数字
 * 例子：
 * "is2 Thi1s T4est 3a" ===> "Thi1s is2 3a T4est"
 * "4of Fo1r pe6ople g3ood th5e the2" ===> "Fo1r the2 g3ood 4of th5e pe6ople"
 * "" ===> ""
 * @param {String} str
 */
function sortStringByNumber(str) {
  if (!str) return ''
  return str
    .split(' ')
    .sort((a, b) => a.match(/[1-9]/).join('') - b.match(/\d/).join(''))
    .join(' ')
}
// console.log(sortStringByNumber('fo11r'))

/**
 *来源：微信群
 *
 * 需求：
 * 方法内传入两个参数，如果第二个参数是第一个参数重新排列顺序而生成的则返回 true
 * @param {String} test
 * @param {String} original
 */
function isAnagram(test, original) {
  if (test.length !== original.length) return false
  const trans = str =>
    str
      .toLowerCase()
      .split('')
      .sort()
      .join('')
  return trans(test) === trans(original)
}
// console.log(isAnagram('foefet', 'toffee'))
// console.log(isAnagram('Buckethead', 'DeathCubeK'))

/**
 * 来源：微信群
 *
 * 需求：
 * 实现一个方法，从数组中寻找某个值作为分割的界点，使得该值左右两边的数相加相等
 * @param {Array} arr
 *
 * 如下是利用高级函数的版本，如果碰到数组长度几千几万的性能会差很多
 */
function findEvenIndex(arr) {
  let sum = (pre, curr) => pre + curr
  for (let index = 1; index < arr.length; index++) {
    let leftTotal = arr.slice(0, index).reduce(sum, 0)
    let rightTotal = arr.slice(index + 1).reduce(sum, 0)
    if (leftTotal === rightTotal) return index
  }
  return false
}
// console.log(findEvenIndex([1, 2, 3, 4, 3, 2, 1]))
// console.log(findEvenIndex([1, 100, 50, -51, 1, 1]))

/**
 * @param {Array} arr
 * 利用动态规划备忘录法来做
 */
function findEvenIndexPro(arr) {
  let sum = (pre, curr) => pre + curr
  let cacheLeft = arr[0]
  let cacheRight = arr.reduce(sum, 0) - arr[0] - arr[1]
  for (let index = 1; index < arr.length; index++) {
    if (cacheLeft === cacheRight) return index
    cacheLeft += arr[index]
    cacheRight -= arr[index + 1]
  }
  return false
}
// console.log(findEvenIndexPro([1, 2, 3, 4, 3, 2, 1]))
// console.log(findEvenIndexPro([1, 100, 50, -51, 1, 1]))

/**
 * 实现各种排序算法
 * 除了特殊说明，默认都是从小到大排序
 */
let arr = [0, 6, 3, 2, 1, 4, 5]
// let arr = [-2, -5, -10, -12, 7, 4, -2, 5, 7, 0, 6, 4, 12, -6, -10, 10, 20, 4, 2, 6, 20, 1, -1, -2, -5, 14, 6]
/**
 * 用于交换一个 arr 中 x 和 y 的位置
 * @param {Number[]} arr
 * @param {Number} x
 * @param {Number} y
 */
function swap(arr, x, y) {
  ;[arr[x], arr[y]] = [arr[y], arr[x]]
}
/**
 * 冒泡排序
 * @param {Number[]} arr
 */
function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    // j < len - 1 - i
    // - 1 是因为要把 arr[arr.length] 排除掉
    // - i 是因为对于最后面的已经排序好的 i 个数字不用再遍历了
    // i 又可以代表是已经排序好的数字的个数
    for (let j = 0; j < len - 1 - i; j++) {
      // 若为 > 则是将大的数字逐渐冒泡到最后一个
      // 若为 < 则是将小的数字逐渐冒泡到第一个
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
    }
  }
  return arr
}
// console.log(bubbleSort(arr))

/**
 * TODO
 * 冒泡排序改进版
 * 设置标志性变量 pos，用于记录每趟排序中最后一次进行交换的位置
 * 由于 pos 位置之后的记录均已交换到位，所以在下一次排序中只要遍历到 pos 位置即可
 * @param {Number[]} arr
 */
// function posBubbleSort(arr) {
//   let i = arr.length - 1
//   while (i > 0) {
//     let pos = 0
//     for (let j = 0; j < i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         pos = j
//         if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
//       }
//     }
//     i = pos
//   }
//   return arr
// }
// console.log(posBubbleSort(arr))

/**
 * 快速排序
 * @param {Number[]} arr
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let temp = arr[0]
  let left = []
  let right = []
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > temp) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat([temp], quickSort(right))
}
// console.log(quickSort(arr))
