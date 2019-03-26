/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-26 09:19:10
 * @LastEditTime: 2019-03-26 10:54:30
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

// 例：如何在不引入其他变量的情况下增加 window.onload 之后的函数
window.onload = function() {
  console.log('old load')
}
window.onload = (window.onload || function() {}).before(function() {
  console.log('new before load')
})
window.onload = (window.onload || function() {}).after(function() {
  console.log('new after load')
})

// 例：如何给函数添加统计代码（或其他任何你想得到的东西）
function foo() {
  for (let index = 0; index < 1000; index++) {
    console.log(index)
  }
}

function logTime(func, funcName) {
  return (function() {
    let d
    return func
      .before(function() {
        d = +new Date()
      })
      .after(function() {
        console.log(`函数 ${funcName} 共计用时`, +new Date() - d + 'ms')
      })
  })()
}

foo = logTime(foo, 'foo')
// console.log(foo())

// 例：分离表单请求和验证
let validataRules = {
  type(value) {
    return typeof value === 'string'
  },
  notEmpty(value) {
    return value.length !== 0
  },
  maxLength(value) {
    return value.length < 10
  }
}

function validata() {
  for (const key in validataRules) {
    if (validataRules.hasOwnProperty(key)) {
      const rule = validataRules[key]
      if (rule.apply(null, arguments) === false) {
        return false
      }
    }
  }
}

function sendData(value) {
  if (validata(value) === false) {
    console.log('you can not send data')
    return
  }
  console.log('you can send data')
}
sendData('some string data')
sendData('string')