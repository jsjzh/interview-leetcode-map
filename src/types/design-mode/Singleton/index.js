/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-25 21:31:20
 * @LastEditTime: 2019-03-25 22:06:17
 * @Description: 单例模式
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点
 * 实现的方法为先判断实例存在与否，如果存在则直接返回
 * 如果不存在就创建了再返回，这就确保了一个类只有一个实例对象
 *
 * 存在的意义
 * 一个实例不管被实例过几次，终究只产生一个实例
 * 就像点击弹窗，终究只有一个弹窗出现
 */

class Singleton {
  constructor(val) {
    this.val = val
    this.instance = null
  }
  getVal() {
    return this.val
  }
}

// 代理 Singleton，以此来保证 new 多次都能返回同一个实例
export let ProxySingleton = (function() {
  // 每次找的都是这个实例
  let instance = null
  return function(val) {
    if (!instance) instance = new Singleton(val)
    return instance
  }
})()
