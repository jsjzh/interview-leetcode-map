# 待整理的面试题

## 涂鸦智能 电面

### js 的基本类型有哪几种

number string boolean object null undefined symbol

object 又分为三个子类型：object array function

### js 的基本类型是存在堆里面还是栈里面

基本类型值在内存中占据固定大小，保存在栈内存中

引用类型值是对象，保存在堆内存中

### ES6 相关的特性

### class 用 babel 转是转成什么样的

```js
function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left)
  } else {
    return left instanceof right
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

var Foo = (function() {
  function Foo() {
    _classCallCheck(this, Foo)
  }

  _createClass(
    Foo,
    [
      {
        key: 'constroctor',
        value: function constroctor(name) {
          this.name = name
        }
      },
      {
        key: 'getName',
        value: function getName() {
          return this.name
        }
      }
    ],
    [
      {
        key: 'tripple',
        value: function tripple() {
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1
          return n * 3
        }
      }
    ]
  )

  return Foo
})()
```

### 对 Vue 的理解

### Vue 响应式的基本原理

### Vue 的响应式在 3.0 中的改变

### Proxy 主要是为了弥补 Object.defineProperty 的什么缺点

### webpack 主要做的优化点

- webpack3.x -> webpack4.x 升级就有编译速度提升的功效
- 提供了 mode 属性，设置为 production 之后会对生产环境做编译优化

### webpack 的 hash chunkhash contenthash 的区别

- hash
  - 每次修改任何一个文件，所有文件名的 hash 都将改变，因为修改了一个文件之后，整个项目的文件缓存都失效了
  - hash 计算是跟整个项目的构建相关的，同一次构建过程中生成的哈希都是一样的
- chunkhash
  - 根据不同的入口文件进行依赖文件解析、构建对应的 chunk，生成对应的哈希值，在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，只要不改公共库的代码，就可以保证哈希值不受影响
  - 但是 index.js 如果引用了 index.css，那么即使 index.css 没有改变，他也会重新构建
- contenthash
  - 针对文件内容级别的，只有模块的内容变了，hash 才会改变

### webpack 打包优化主要做了什么性能优化

### webpack 里面，同个 function 在 js 文件，webpack 打包的时候会做哪些方面的处理

### http 缓存相关的知识

### http 缓存分为那些缓存，判断依据是什么

### 跨域相关的知识

发生跨域的情况，协议、域名、端口号有一个不一样就会发生跨域
