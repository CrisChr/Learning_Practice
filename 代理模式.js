/**
 * 代理模式：提供一个“替身”来控制对一个对象的访问，程序实际访问的是替身对象，替身对象对请求作出一些处理之后再把请求转交给本体对象
 */

/**
 * 图片懒加载
 * 这里将占位图片交给proxyImage函数去处理，而真正的图片则是在myImage函数内加载
 * 用来占位的loading图片只是一个锦上添花的功能，将给代理对象实现符合“单一职责”原则
 */

const myImage = (function(){
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src){
      imgNode.src = src;
    }
  }
})();

const proxyImage = (function(){
  const img = new Image();
  img.onload = function(){
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function(src){
      myImage.setSrc('loading.gif')
      img.src = src;
    }
  }
})();

proxyImage.setSrc('img_from_api.jpg');

/**
 * 代理模式：合并多个http请求
 *   不直接发送请求，而是创建一个代理函数来收集一段时间内的请求，最后再一次性发送给服务器，类似于防抖，只不过这个防抖函数用代理来实现
 */

/**
 * 代理模式：缓存ajax请求返回的数据
 *    作用于分页查询，第一次查询后将返回的数据缓存起来，之后在相同页数下不请求服务器而是直接从缓存中读取，这个缓存可以通过一个代理函数实现
 */