/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-22 13:34:44
 * @LastEditTime: 2019-03-22 15:54:13
 * @Description: 页面初始化
 */
// parcel 独特的批量引入方式，引入为一个对象，key 为文件名，value 为其对应的 html 片段
import pages from '../types/html-code/*.html'
import '../types/html-code/*.css'
const app = document.getElementById('app')
const header = document.getElementById('header')

const pageData = [{ to: 'horizontal-vertical-center', title: '各种居中' }]

let ul = document.createElement('ul')
pageData.forEach(item => {
  let li = document.createElement('li')
  li.setAttribute('data-page', item.to)
  li.innerText = item.title
  ul.appendChild(li)
})

if (!header.contains(ul)) {
  header.appendChild(ul)
}

function setPage(page) {
  if (!page) {
    app.innerHTML = pages['home']
  } else {
    app.innerHTML = pages[page] || pages['404']
  }
}

function setLead(page) {
  const liList = header.querySelector('ul').querySelectorAll('li')
  for (let ind = 0; ind < liList.length; ind++) {
    const li = liList[ind]
    if (li.dataset.page === page) {
      li.style.color = '#2196f3'
    } else {
      li.style.color = 'black'
    }
  }
}

function handleHashChange() {
  const locationPage = location.hash.slice(1)
  setPage(locationPage)
  setLead(locationPage)
}

window.onhashchange = handleHashChange

function handleSwitchPage(e) {
  let target = e.target
  if (target.tagName === 'LI') {
    let { page } = target.dataset
    if (location.hash !== page) {
      location.hash = page
    }
  }
}

handleHashChange()
header.querySelector('ul').addEventListener('click', handleSwitchPage)

if (module.hot) {
  module.hot.dispose(() => {
    console.log('module is about to be replaced')
    header.querySelector('ul').removeEventListener('click', handleSwitchPage)
    header.removeChild(ul)
  })

  module.hot.accept(() => {
    console.log('module or one of its dependencies was just updated')
  })
}
