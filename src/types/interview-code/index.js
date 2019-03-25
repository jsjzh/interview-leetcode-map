/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-20 21:19:51
 * @LastEditTime: 2019-03-25 16:45:01
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
