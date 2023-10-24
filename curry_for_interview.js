function curry(fn){
  return function _curry(savedArgs){
    return function (...args){
      const newParams = Array.prototype.concat.call(savedArgs, ...args);
      if(newParams.length === fn.length){
        return fn(...newParams);
      }else{
        return _curry(newParams);
      }
    }
  }
  // return function curried(...args){
  //   if(args.length < fn.length){
  //     return function(..._args){
  //       return curried.apply(this, [...args, ..._args]);
  //     }
  //   }
  //   return fn.apply(this, args);
  // }
}

function hyCurrying(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }

  return curried
}

function sum(a, b, c){
  return a+b+c;
}

const c = curry(sum); // _curry

console.log(c(1)(2)(3));
console.log(c(1)(2, 3));

// 最简单的柯里化函数：bind
// function partial(fn, ...args){
//   return fn.bind(undefined, ...args);
// }

// const bb = partial(sum, 2);
// const bb_1 = partial(bb, 2)
// console.log(bb_1(3, 5))

