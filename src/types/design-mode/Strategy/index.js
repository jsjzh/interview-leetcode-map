/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-25 22:03:55
 * @LastEditTime: 2019-03-25 22:14:52
 * @Description: 策略模式
 * 定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换
 * 目的是将算法的使用和算法的实现分开来
 *
 * 一个基于策略模式的程序至少由两部分组成，第一个部分是一组策略类（可变）
 * 策略类封装了具体的算法，并负责具体的计算过程
 * 第二个部分是环境类（不变）
 * 环境类接受客户的请求，随后将请求委托给某一个策略类
 * 要做到这点，说明环境类要维持对某个策略对象的引用
 */

// 策略类
let strategys = {
  add(num) {
    return num + 1
  },
  minus(num) {
    return num - 1
  }
}

// 环境类
export function strategy(type, num) {
  return strategys[type](num)
}
