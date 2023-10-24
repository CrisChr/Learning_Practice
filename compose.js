function compose(...fns){
  let len = fns.length;
  for(let i=0; i<len; i++){
    const fn = fns[i];
    if(typeof fn !== 'function'){
      throw new TypeError('Expected a function')
    }
  }

  return function(...args){
    let index = 0;
    let result = len ? fns[index].apply(this, args) : args;
    while(++index < len){
      result = fns[index].call(this, result);
    }
    return result;
  }
}