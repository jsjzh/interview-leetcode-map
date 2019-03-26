/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-25 22:17:07
 * @LastEditTime: 2019-03-26 09:02:20
 * @Description: 代理模式
 * 为一个对象提供一个代用品或占位符，以便控制对它的访问
 *
 * 常用的虚拟代理形式，某一个花销很大的操作，可以通过虚拟代理的方式
 * 延迟需要他的时候采取创建（如：使用虚拟代理实现图片懒加载）
 * 先通过一张 loading 的图占位（小图，加载快），通过异步的方式加载图片，等图片加载好了
 * 再把完成的图片加载到 img 标签里面
 */

export const setImg = (function() {
  return {
    setSrc(targetEl, src) {
      targetEl.src = src
    }
  }
})()

export const setImgAgency = (function() {
  return {
    setSrc(targetEl, src) {
      let img = new Image()
      img.src = src
      img.onload = function() {
        setImg.setSrc(targetEl, src)
      }
      targetEl.src = 'http://www.sucaijishi.com/uploadfile/2015/0210/20150210104951657.gif'
    }
  }
})()
