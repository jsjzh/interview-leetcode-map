/**
 * 标签（label）
 *
 * JavaScript 语言允许语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置
 * 标签通常与 break 和 continue 语句配合使用，跳出特定的循环
 */

// foo: for (var i = 0; i < 3; i++) {
//   bar: for (var j = 0; j < 3; j++) {
//     if (i === j) continue foo
//     console.log(`i = ${i}, j = ${j}`)
//   }
// }
// i = 1, j = 0
// i = 2, j = 0
// i = 2, j = 1

// foo: for (var i = 0; i < 3; i++) {
//   bar: for (var j = 0; j < 3; j++) {
//     if (i === j) continue bar
//     console.log(`i = ${i}, j = ${j}`)
//   }
// }
// i = 0, j = 1
// i = 0, j = 2
// i = 1, j = 0
// i = 1, j = 2
// i = 2, j = 0
// i = 2, j = 1

/**
 * switch...case 结构
 *
 * 建议改为对象结构来执行
 */

function doAction(action) {
  switch (action) {
    case 'hack':
      return 'hack'
    case 'slash':
      return 'slash'
    case 'run':
      return 'run'
    default:
      throw new Error('Invalid action.')
  }
}

function doAction(action) {
  var actions = {
    hack: function() {
      return 'hack'
    },
    slash: function() {
      return 'slash'
    },
    run: function() {
      return 'run'
    }
  }

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.')
  }

  return actions[action]()
}
