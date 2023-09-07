// 节流
function throttle(fn, time) {
  let valid = true;
  return function(){
    if(!valid) return;
    valid = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      valid = true;
    }, time);
  }
}

// 防抖
function debounce(fn, time){
  let timer = null;
  return function(){
    if(timer){
      clearTimeout();
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  }
}

/**
 * flex: flex-shrink, flex-grow, flex-basic
 * 
 * 
 * 
 */