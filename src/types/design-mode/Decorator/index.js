/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-26 09:19:10
 * @LastEditTime: 2019-03-26 09:38:03
 * @Description: 装饰者模式
 *
 * 在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法
 *
 * 在原有方法上再挂载其他方法来满足现有需求
 * 函数的解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂载到某个函数上
 * 实现相同的效果但增强了复用性
 */

// 用 AOP 装饰函数实现装饰者模式
Function.prototype.before = function(beforeFn) {
  let self = this
  return function() {
    beforeFn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

Function.prototype.after = function(afterFn) {
  let self = this
  return function() {
    let ret = self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

function func0() {
  console.log(arguments.callee.name)
}

function func1() {
  console.log(arguments.callee.name)
}

function func3() {
  console.log(arguments.callee.name)
}

let foo = func0.before(func1).after(func3)

foo()
