import 'babel-polyfill'
import 'static/css/normalize.css'
import 'static/css/reset.css'
import 'static/css/github-markdown.css'

const app = document.getElementById('app')
// -------------
// 开始写项目代码

// ------------- html -------------
// let horizontalVerticalCenter = require('types/html-code/horizontal-vertical-center/index.html')
// import 'types/html-code/horizontal-vertical-center/index.css'
// app.innerHTML = horizontalVerticalCenter
// ------------- leetcode -------------
import 'types/leetcode'
// ------------- interview -------------
// import 'types/interview-code'

// -------------
if (module.hot) {
  module.hot.dispose(function() {
    console.log('module is about to be replaced')
  })

  module.hot.accept(function() {
    console.log('module or one of its dependencies was just updated')
  })
}
