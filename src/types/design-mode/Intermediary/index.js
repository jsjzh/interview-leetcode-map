/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-26 09:06:18
 * @LastEditTime: 2019-03-26 09:32:29
 * @Description: 中介者模式
 *
 * 通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用
 * 当其中的一个对象发生改变时，只需要通知中介者对象即可
 * 通过中介者模式可以解除对象与对象之间的紧耦合关系
 *
 * 适用场景，购物车，商品选择，商品购买数量，都会触发 change 事件
 * 可以通过中介者来处理这些事件，实现各个事件之间的解耦，仅仅需要维护中介者即可
 */

let colorSelect = document.getElementById('colorSelect')
let memorySelect = document.getElementById('memorySelect')
let numSelect = document.getElementById('numSelect')

export const Intermediary = (function() {
  return {
    change(target) {
      switch (target.id) {
        case 'colorSelect':
          console.log('colorSelect')
          break
        case 'memorySelect':
          console.log('memorySelect')
          break
        case 'numSelect':
          console.log('numSelect')
          break
      }
    }
  }
})()

if (colorSelect) {
  colorSelect.onchange = function() {
    Intermediary.change(this)
  }
}
if (memorySelect) {
  memorySelect.onchange = function() {
    Intermediary.change(this)
  }
}
if (numSelect) {
  numSelect.onchange = function() {
    Intermediary.change(this)
  }
}

console.log(Intermediary)
