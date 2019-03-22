/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-22 08:47:11
 * @LastEditTime: 2019-03-22 08:50:38
 * @Description: helper 函数集合，一般是 leetcode 中的题目已经定义的函数，比如单向链表，二叉树之类的
 */
/**
 *
 * @param {*} val
 */

export function ListNode(val) {
  this.val = val
  this.next = null
}

// 对链表不产生影响，方便测试
ListNode.prototype.push = function(num) {
  let newNode = new ListNode(num)
  let currNode = this
  while (currNode.next) currNode = currNode.next
  currNode.next = newNode
  return this
}

// 对链表不产生影响，方便测试
ListNode.prototype.toString = function() {
  let currNode = this
  let str = ''
  while (currNode.next) {
    str += currNode.val + ','
    currNode = currNode.next
  }
  str += currNode.val
  return str
}
