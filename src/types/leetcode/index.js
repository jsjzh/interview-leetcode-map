/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-08 09:45:09
 * @LastEditTime: 2019-05-20 11:48:29
 * @Description
 *  果然每天的生活都需要点算法题调剂调剂，每天都是重复的业务代码太无趣了，我渴望一点需要动脑子的东西，遂就有了这个小项目
 *  写上来的代码都是可以通过 leedcode 的测试的，只不过嘛，用时和内存消耗就没有那么完美了，但我会对不满意的题目重写一遍，开拓新的思路，撒花
 */

import { ListNode, TreeNode, TestTreeNode } from './util'

/**
 * CLEAR
 * 给出一个目标数字，查询数组中是否有和为目标的两个数字
 * @param {Array} nums 待查询数组
 * @param {Number} target 目标数字
 */
let twoSum = function(nums, target) {
  for (let index = 0; index < nums.length; index++) {
    const number = nums[index]
    let other = target - number
    let _index = nums.indexOf(other)
    if (_index !== -1 && _index !== index) return [index, _index]
    else continue
  }
  return []
}

/**
 * TODO 需要完善
 * 将一个数字反转，若反转后超出 [-2^31, 2^31-1] 范围，则返回 0
 * @param {Number} x 数字
 *
 * Tip
 * -Math.pow(2, 31) === -2147483648
 * Math.pow(2, 31) - 1 === 2147483647
 *
 * 官方解题思路
 * 比较神奇的一个想法，出栈入栈，但因为没有辅助函数，所以可以用 num % 10 来实现
 */
let reverse = function(x) {
  if (x === 0) return 0
  let flag = false
  if (x > 0) flag = true
  x = Math.abs(x)
    .toString()
    .split('')
    .reverse()
    .join('')
  if (flag) x = +x
  else x = -+x

  if (x < -2147483648 || x > 2147483647) return 0
  else return x
}

/**
 * TODO 需要完善
 * 判断一个整数是否是回文数
 * @param {Number} x 数字
 *
 * 官方解题思路
 * 可以判断数字的前一半和后一半是否相同
 */
let isPalindrome = function(x) {
  if (x < 0) return false
  if (x === 0) return true
  let y = +x
    .toString()
    .split('')
    .reverse()
    .join('')
  return y === x
}

const roman = { CM: 900, CD: 400, XC: 90, XL: 40, IX: 9, IV: 4, M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }
/**
 * CLEAR
 * 罗马数字转整数
 * 给定一个罗马数字，将其转换成整数，输入确保在 1 至 3999 的范围内
 * @param {String} s
 * @return {Number}
 */
let romanToInt = function(s) {
  let number = 0

  for (const key in roman) {
    if (roman.hasOwnProperty(key)) {
      const count = roman[key]
      let reg = new RegExp(key, 'g')
      s = s.replace(reg, function() {
        number += count
        return ''
      })
    }
  }
  if (1 < number < 3999) return number
  else throw new Error('error')
}

/**
 * CLEAR
 * 查找字符串数组中的最长公共前缀
 * 如果不存在公共前缀则返回空字符串 ""
 * 所有输入只包含小写字母 a-z
 * @param {String[]} strs
 * @return {String}
 */
let longestCommonPrefix = function(strs) {
  let rtStr = ''
  if (!strs.length) return rtStr
  let target = strs[0]
  let behind = strs.splice(1)
  let len = target.length
  for (let i = 0; i < len; i++) {
    let char = target[i]
    if (behind.every(item => item[i] === char)) {
      rtStr += char
    } else {
      break
    }
  }
  return rtStr
}

/**
 * CLEAR
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
 * 有效字符串需满足：
 *  左括号必须用相同类型的右括号闭合
 *  左括号必须以正确的顺序闭合
 *  注意空字符串可被认为是有效字符串
 * @param {String} s
 * @return {Boolean}
 */
let isValid = function(s) {
  if (s.length & 1) return false
  let old
  do {
    old = s
    s = s.replace(/(\[\]|\(\)|\{\})/g, '')
  } while (old.length !== s.length)
  return s.length === 0
}

/**
 * CLEAR
 * 将两个有序链表合并为一个新的有序链表并返回y
 * 新链表是通过拼接给定的两个链表的所有节点组成的
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let mergeTwoLists = function(l1, l2) {
  if (l1 === null || l1.val === null) return l2
  if (l2 === null || l2.val === null) return l1

  let start = new ListNode(0)
  let cur = start

  while (l1 !== null && l2 !== null) {
    if (l1.val >= l2.val) {
      cur.next = l2
      l2 = l2.next
    } else if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    }
    cur = cur.next
    if (l2 === null) {
      cur.next = l1
    }
    if (l1 === null) {
      cur.next = l2
    }
  }
  return start.next
}
// 测试用例
// let L = new ListNode(-2).push(5)
// let R = new ListNode(-9).push(-6).push(-3).push(-1).push(1).push(6)
// console.log(mergeTwoLists(L, R).toString())

/**
 * CLEAR
 * 给定一个排序数组，需要在原地删除重复出现的元素，使得每个元素只出现一次
 * 返回移除后数组的新长度
 * 不适用额外的数组空间，要在原地修改输入数组并在使用 O(1) 额外空间的条件下完成
 *
 * 不需要考虑数组中超出新长度后面的元素
 * @param {Number[]} nums
 * @return {Number}
 *
 * 一开始的解法似乎读错题意了
 * 题目意思是把相同的数字移到前面，并返回新长度
 * 如果循环原数组的新长度将不会得到重复的数字
 * 但是重复的部分并不是删除了，只是放到新长度后面去了
 */
let proRemoveDuplicates = function(nums) {
  if (nums.length == 0) return 0
  let i = 0
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] != nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
// let removeDuplicates = function(nums) {
//   for (let index = 0; index < nums.length; index++) {
//     if (nums[index] === nums[index + 1]) {
//       nums.splice(index, 1)
//       index = index - 1
//     }
//   }
//   return nums.length
// }

/**
 * CLEAR
 * 给定一个数组 nums 和一个值 val，需要原地移除所有数值等于 val 的元素
 * 返回移除后数组的新长度
 * 不要使用额外的数组空间，必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成
 * 元素的顺序可以改变，不需要考虑数组中超出新长度后面的元素
 * 返回的数组中元素可以为任意顺序
 * @param {Number[]} nums
 * @param {Number} val
 * @return {Number}
 */
let proTwoRemoveElement = function(nums, val) {
  let i = 0
  let n = nums.length
  while (i < n) {
    if (nums[i] === val) {
      nums[i] = nums[n - 1]
      n--
    } else {
      i++
    }
  }
  return n
}
let proRemoveElement = function(nums, val) {
  let i = 0
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      nums[i] = nums[j]
      i++
    }
  }
  return i
}
let removeElement = function(nums, val) {
  for (let index = 0; index < nums.length; index++) {
    if (val === nums[index]) {
      nums.splice(index, 1)
      index = index - 1
    }
  }
  return nums.length
}

/**
 * CLEAR
 * 给定一个 haystack 字符串和一个 needle 字符串
 * 在 haystack 字符串中找出 needle 字符串出现的第一个位置（从 0 开始）
 * 如果不存在，则返回 -1
 * @param {String} haystack
 * @param {String} needle
 * @return {Number}
 *
 * 怎么感觉这个问题怪怪的？还是说是我想太少了？
 * 不过倒是提醒了我一个问题，如果 needle 为 ""，返回的是什么
 * 在 indexOf 中应该返回 0
 */
let strStr = function(haystack, needle) {
  return haystack.indexOf(needle)
}

/**
 * CLEAR
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置
 * 你可以假设数组中无重复元素
 * @param {Number[]} nums
 * @param {Number} target
 * @return {Number}
 */
let proSearchInsert = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i
    }
  }
  return nums.length
}
let searchInsert = function(nums, target) {
  for (let index = 0; index < nums.length; index++) {
    const count = nums[index]
    if (count === target) {
      return index
    } else if (target < count) {
      return index
    } else if (nums[index - 1] < target && target < count) {
      return index
    }
  }
  return nums.length
}

/**
 * CLEAR
 * 报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数
 * 其前五项如下
 *   1 ===> 1
 *   2 ===> 11
 *   3 ===> 21
 *   4 ===> 1211
 *   5 ===> 111221
 * 规律如下
 *   1  被读作 "one 1"，即 11
 *   11 被读作 "two 1"，即 21
 *   21 被读作 "one 2"，"one 1"，即 1211
 * 给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项
 * 注意：整数顺序将表示为一个字符串
 * @param {Number} n
 * @return {String}
 */
let countAndSay = function(n) {
  let str = '1'
  while (n - 1) {
    let old = str
    str = ''
    let tag = old[0]
    let num = 0

    for (let ind = 0; ind < old.length; ind++) {
      if (old[ind] === tag) {
        num++
      } else {
        str += num + '' + tag
        tag = old[ind]
        num = 1
      }
      if (ind + 1 === old.length) {
        str += num + '' + tag
      }
    }
    n--
  }
  return str
}

/**
 * TODO
 * 给定一个整数数组 nums
 * 找到一个具有最大和的连续子数组（子数组最少包含一个元素）
 * 返回其最大和
 * 进阶
 *   如果你已经实现复杂度为 O(n) 的解法
 *   尝试使用更为精妙的分治法求解
 * @param {Number[]} nums
 * @return {Number}
 *
 * 解题思路
 * 妈耶，这个好烦，解不出来，先放着，以后再来想！！！
 */
let maxSubArray = function(nums) {
  let max = nums[0]
  return max
}
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))

/**
 * 拓展学习
 * 求解斐波拉契数列优化版，说一说思想，用到了动态规划
 * 自顶向下版本
 * 动态规划一言以蔽之就是会记录曾经求过的值，再次求值会直接使用该值
 * 这里用了对象的存储器，key ==> value 的方式取值最快
 * 在获取 n2 的时候，由于 n2 都是等于 n-2 的值，而之前已经求过 n-1，而看我们的代码
 * 在求解 n-1 的时候就已经将其存储起来
 */
let fibonacciMark_utd = { 0: 0 }
function fibonacci_utd(n) {
  if (n <= 0) return 0
  if (n === 1) return 1
  let n1 =
    fibonacciMark_utd[n - 1] != null ? fibonacciMark_utd[n - 1] : (fibonacciMark_utd[n - 1] = fibonacci_utd(n - 1))
  let n2 = fibonacciMark_utd[n - 2]
  return n1 + n2
}

/**
 * 拓展学习
 * 求解斐波那契数列再优化版
 * 自下向上版本
 * 该种解法乍一看好像没有备忘录存储
 * 但其实我的理解就是，斐波那契数列其实质就是一个存储的过程
 * 下一个数等于前两个数之和，不就是存储吗？
 */
function fibonacci_dtu(n) {
  let x1 = 0
  let x2 = 1
  for (let ind = 0; ind < n; ind++) {
    let next = x1 + x2
    x1 = x2
    x2 = next
  }
  return x1
}

/**
 * 钢条切割问题，又称最优子结构
 * steelPrices 的下标可认为是切割的长度，值为该长度的价格
 * 假设有个 4 长度的钢条，该如何切割让他的价值达到最大
 * 这个就是最优子结构
 * 递归的解法
 * 怎么说呢，在还不知道动态规划的时候我觉得这个已经够牛皮了
 * 但是在我知道了动态规划之后，我觉得，我可以让他更牛皮一些
 *
 * 解题思路
 * 钢材切割问题的思路是将钢条先切割 i，这个部分我们不做后续切割，剩下的那部分我们需要最优解
 */
let steelPrices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30]
function cut(steelPrices, len) {
  if (len > steelPrices.length) throw new Error('传入的 len 不得大于字典的长度，因为就无法获取该长度不截取时候的价格了')
  if (len === 0) return 0
  let max = 0
  for (let ind = 1; ind <= len; ind++) {
    max = Math.max(max, steelPrices[ind - 1] + cut(steelPrices, len - ind))
  }
  return max
}

/**
 * 钢铁切割问题的从上往下递归的备忘录版本
 * cutMark_utd 就是备忘录
 * 和斐波那契数列的类似，就是每次将其存储起来以保证下次可以直接获取最优解
 * 减少了大量递归次数
 *
 * 解题思路
 */
let cutMark_utd = { 0: 0 }
function cut_utd(steelPrices, len) {
  if (len > steelPrices.length) throw new Error('传入的 len 不得大于字典的长度，因为就无法获取该长度不截取时候的价格了')
  if (len === 0) return 0
  if (len === 1) return steelPrices[0]
  let max = 0
  for (let ind = 1; ind <= len; ind++) {
    let start = steelPrices[ind - 1]
    let end = cutMark_utd[len - ind]
      ? cutMark_utd[len - ind]
      : (cutMark_utd[len - ind] = cut_utd(steelPrices, len - ind))
    max = Math.max(max, start + end)
  }
  return max
}

/**
 * 钢铁切割问题，由下往上的版本
 * 都不用递归了，美滋滋
 *
 * 解题思路
 */
let cutMark_dtu = { 0: 0 }
function cut_dtu(steelPrices, len) {
  if (len > steelPrices.length) throw new Error('传入的 len 不得大于字典的长度，因为就无法获取该长度不截取时候的价格了')
  for (let ind = 1; ind <= steelPrices.length; ind++) {
    let max = 0
    for (let cutLen = 1; cutLen <= ind; cutLen++) {
      max = Math.max(max, steelPrices[cutLen - 1] + cutMark_dtu[ind - cutLen])
    }
    cutMark_dtu[ind] = max
  }
  return cutMark_dtu[len]
}

/**
 * 这是一道小朋友过桥的问题
 * 假设有 n 个小朋友，每个小朋友过桥的时间如 getChildsTimes 计算
 * 只有一个手电筒，桥每次只能过两个人，时间由最慢的那个人决定
 * 每次过了桥之后还需要有人把手电筒送回来
 * 求最短的过桥时间
 *
 * 解题思路
 * 这里我的想法和网上的人不一样，我的做法是优先将最长时间的小朋友人道毁灭（误）
 * 当排除了最长时间的小朋友之后就又回到了子序列的问题，具体可以看如下
 *
 * 1 3 6 10 15 &=== 无
 * 6 10 15     ===& 1 3         --- 3
 * 1 6 10 15   &=== 3           --- 1
 * 1 6         ===& 3 10 15     --- 15
 * 1 3 6       &=== 10 15       --- 3
 * 如上，就是求解 1 3 6 的最短时间，也就是三个小朋友的最短时间
 * 3           ===& 1 6 10 15   --- 6
 * 1 3         &=== 6 10 15     --- 1
 * 无          ===& 1 3 6 10 15 --- 3
 */
/**
 * @param {Number} n 小朋友的个数
 */
function getChildsTimes(n) {
  let arr = [1]
  for (let ind = 1; ind < n; ind++) {
    arr.push(arr[ind - 1] + ind + 1)
  }
  return arr
}
let crossBridgeMark = { 1: 1, 2: 3, 3: 10 }
/**
 * @param {Number[]} times 小朋友的过河时间
 */
function crossBridge(times) {
  let min
  if (crossBridgeMark[times.length]) return crossBridgeMark[times.length]
  let front = crossBridgeMark[times.length - 2]
    ? crossBridgeMark[times.length - 2]
    : (crossBridgeMark[times.length - 2] = crossBridge(times.slice(0, times.length - 2)))

  min = front + times[times.length - 1] + times[0] + 2 * times[1]

  return min
}

/**
 * 给定一个长度为 n 的字符串，求插入最少多少个字符能使它变成一个回文串
 * 回文串：abcdcba aba
 * @param {String} str 字符串，长度（n<=1000）
 *
 * 暴力解法，但是莫名的挺有成就感的，本来觉得这个题目我又要想一天了
 * 要引入备忘录，应该能减少查询的时间，另外，这个在动态规划里应该算是从上往下的
 * 还要想想怎么才能从下往上，表示难度有点高
 *
 * 解题思路
 * 一个字符串假设是 X，若要判断它是否是回文串，最直观的方法就是判断它第一位和最后一位是否相同
 * 我们用 a[i] 和 a[j] 表示这两个字符串，若 a[i] !== a[j]，即表示需要增添一位才能实现回文串，而我们要做的就是比较这一位是增加在 i-1 的位置还是 j-1 的位置更好
 * 两个 count 的值就是这么来的，然后我们将增加后的字符串做裁剪之后继续调用该函数继续遍历，最后将所有的 count 加起来即为结果
 *
 * 动态规划的核心就是将本来复杂的问题拆解成子问题来实现，最后将子问题合并既是复杂问题的解
 */
function insertToPalindrome(str) {
  if (str.length <= 1) return 0
  let count = 0
  let flag = false
  for (let ind = 0; ind < str.length; ind++) {
    if (str[ind] !== str[str.length - 1 - ind]) {
      flag = true
      break
    }
  }
  if (flag) {
    count++
    let xCount = count + insertToPalindrome(str.slice(1, str.length))
    let yCount = count + insertToPalindrome(str.slice(0, str.length - 1))

    count = Math.min(xCount, yCount)
  }
  return count
}

/**
 * TODO
 * 给定一个仅包含大小写字母和空格 " " 的字符串，返回其最后一个单词的长度。
 * 如果不存在最后一个单词，请返回 0 。
 * 说明：一个单词是指由字母组成，但不包含任何空格的字符串。
 *
 * @param {String} s
 * @return {Number}
 *
 * 解题思路
 * 这道题目，初看好像很简单，其实考察的就是细心，首先如果是单字母的字符串怎么处理，还有 "   " 怎么处理，还有 "a " 怎么处理
 * 好像我这个解法耗时很长。。就感觉很蠢的样子
 */
let lengthOfLastWord = function(s) {
  let arr = s.trim().split(' ')
  return arr[arr.length - 1].length
}

/**
 * CLEAR
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 *
 * @param {Number[]} digits
 * @return {Number[]}
 *
 * 解题思路
 * 这道题的坑就在于若加一之后进位了该怎么办，因为数组中每个元素只存储一个数字
 * 而且对于超出 js 的范围的数字该如何考虑呢？肯定不能简单的转为数字然后加一再分割（说啥呢，你不就是这么做的么？）
 */
let plusOne = function(digits) {
  digits[digits.length - 1] += 1
  for (let index = digits.length - 1; index >= 0; index--) {
    let num = digits[index]
    if (num < 10) continue
    digits[index] = 0
    digits[index - 1] != null ? (digits[index - 1] += 1) : (digits.unshift(0), (digits[index] += 1))
  }
  return digits
}

/**
 * TODO
 * 给定两个二进制字符串，返回他们的和（用二进制表示）。
 * 输入为非空字符串且只包含数字 1 和 0。
 *
 * @param {String} a
 * @param {String} b
 * @return {String}
 *
 * 解题思路
 * 和上面的题目一样，需要考虑到超出 js 范围的数字应该怎么办，所以不能直接转数字
 */
let addBinary = function(a, b) {}
// 测试用例
// "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000"
// console.log(
//   addBinary(
//     '10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101',
//     '110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011'
//   )
// )

/**
 * TODO
 * 实现 int sqrt(int x) 函数。
 * 计算并返回 x 的平方根，其中 x 是非负整数。
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 *
 * 解题思路
 * 没有思路，直接 Math.sqrt 就上，当然是不可能的，所以该题为瞎搞
 * 当然也不是说不会做，只不过颅内给该题分配的重要度没那么高
 * @param {Number} x
 * @return {Number}
 */
let mySqrt = function(x) {
  return parseInt(Math.sqrt(x))
}

/**
 * CLEAR
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 注意：给定 n 是一个正整数。
 *
 * 解题思路
 * 咋一看好像有点麻烦，但是想一想其实就是个动态规划，假设你在 n，那你要达到 n 就有两种方法
 * 第一个是从 n-1 爬一步，一个是从 n-2 爬两步，换个方向想，也就是说第三个等于前两个之和，那其实就是斐波那契数列
 * @param {Number} n
 * @return {Number}
 */
// 递归版本，很容易懂，但是数字大了之后就凉凉，马上就溢出了
function climbStairs(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  let sum = 0
  sum = climbStairs(n - 1) + climbStairs(n - 2)
  return sum
}

// 动态规划的备忘录版本，由上至下
let proClimbStairsMark = { 1: 1, 2: 2 }
function proClimbStairs(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  let sum = 0
  let prev = proClimbStairsMark[n - 1] ? proClimbStairsMark[n - 1] : (proClimbStairsMark[n - 1] = proClimbStairs(n - 1))
  let prev2 = proClimbStairsMark[n - 2]
  sum = prev + prev2
  return sum
}

// 动态规划由下至上版本
function superClimbStairs(n) {
  let first = 1
  let next = 1
  for (let ind = 1; ind < n; ind++) {
    let oldNext = next
    next += first
    first = oldNext
  }
  return next
}

/**
 * CLEAR
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = function(head) {
  if (!head) return head
  if (head.val == null) return head
  let currNode = head
  while (currNode.next) {
    if (currNode.val === currNode.next.val) {
      currNode.next = currNode.next.next
    } else {
      currNode = currNode.next
    }
  }
  return head
}
// 测试用例
// let deleteDuplicatesTest = new ListNode(1).push(1).push(2)
// console.log(deleteDuplicates(deleteDuplicatesTest).toString())

/**
 * TODO
 * 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
 * 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 * @param {Number[]} nums1
 * @param {Number} m
 * @param {Number[]} nums2
 * @param {Number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
let merge = function(nums1, m, nums2, n) {}
// 测试用例
// console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))

/**
 * CLEAR
 * 给定两个二叉树，编写一个函数来检验它们是否相同。
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 *
 *   1        1
 *  2 3      2 3
 * [1,2,3]  [1,2,3]
 * output: true
 *
 *   1        1
 *  2          2
 * [1,2]    [1,null,2]
 * output: false
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {Boolean}
 */
let isSameTree = function(p, q) {
  if (p === null) return q === null
  if (q === null) return p === null
  if (q.val !== p.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

/**
 * CLEAR
 * 给定一个二叉树，检查它是否是镜像对称的。
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 * 如果你可以运用递归和迭代两种方法解决这个问题，会很加分。
 *    1
 *  2   2
 * 3 4 4 3
 *
 * 解题思路
 * 暂时就只想到递归的做法，而且还新声明了一个函数
 * 迭代的做法暂时没想到
 * @param {TreeNode} root
 * @return {Boolean}
 */
let isSymmetric = function(root) {
  if (!root) return true
  if (!root.val && (!root.left && !root.right)) return true
  function judge(left, right) {
    if (left === null) return right === null
    if (right === null) return left === null
    if (left.val !== right.val) return false
    return judge(left.left, right.right) && judge(left.right, right.left)
  }
  return judge(root.left, root.right)
}

/**
 * CLEAR
 * 给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 说明: 叶子节点是指没有子节点的节点。
 * 给定二叉树 [3,9,20,null,null,15,7]
 *     3
 *  9    20
 *     15   7
 * 最大深度为 3
 * @param {TreeNode} root
 * @return {Number}
 */
let maxDepth = function(root) {
  if (!root) return 0
  if (!root.left && !root.right) return 1
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

/**
 * TODO
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。
 * 即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历。
 * 给定二叉树 [3,9,20,null,null,15,7]
 *     3
 *   9   20
 *     15   7
 * [
 *   [15,7],
 *   [9,20],
 *   [3]
 * ]
 * @param {TreeNode} root
 * @return {Number[][]}
 */
let levelOrderBottom = function(root) {
  if (!root.val || (!root.left && !root.right)) return []
  let arr = [root.val]
  function levelToArr(left, right) {
    if (!left || !right) return []
    let sum = []
    if (left.val) sum.push(left.val)
    if (right.val) sum.push(right.val)
    return sum.concat(levelToArr(left.left, left.right))
  }
  return arr.concat(levelToArr(root.left, root.right))
}

// console.log(new TestTreeNode([3, 9, 20, null, null, 15, 7]))
// console.log(levelOrderBottom(new TestTreeNode([3, 9, 20, null, null, 15, 7])))

/**
 * CLEAR 简单版
 * 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
 * 输入 5
 * 输出
 * [
 *       [1],
 *      [1,1],
 *     [1,2,1],
 *    [1,3,3,1],
 *   [1,4,6,4,1]
 * ]
 * @param {Number} numRows
 * @return {Number[][]}
 */
let generate = function(numRows) {
  if (numRows === 0) return []
  if (numRows === 1) return [[1]]
  if (numRows === 2) return [[1], [1, 1]]
  let arr = [[1], [1, 1]]
  for (let index = 2; index < numRows; index++) {
    const count = index + 1
    arr[index] = new Array(count).fill(null)
    for (let ind = 0; ind < arr[index].length; ind++) {
      if (ind === 0 || ind === arr[index].length - 1) {
        arr[index][ind] = 1
      } else {
        arr[index][ind] = arr[index - 1][ind - 1] + arr[index - 1][ind]
      }
    }
  }
  return arr
}

// console.log(generate(10))

/**
 * TODO
 * 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
 * @param {Number} rowIndex
 * @return {Number[]}
 */
let getRow = function(rowIndex) {}
// console.log(getRow(10))

/**
 * TODO
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
 * 注意你不能在买入股票前卖出股票。
 *
 * 输入 [7,1,5,3,6,4]
 * 输出 5
 * 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
 *
 * 输入 [7,6,4,3,1]
 * 输出 0
 * 在这种情况下, 没有交易完成, 所以最大利润为 0。
 * @param {Number[]} prices
 * @return {Number}
 */
let maxProfit = function(prices) {
  let max = 0
  for (let i = prices.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      max = Math.max(max, prices[i] - prices[j])
    }
  }
  return max
}
// console.log(maxProfit([7, 6, 4, 3, 1]))
