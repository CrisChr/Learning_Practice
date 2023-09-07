/**
 * 函数柯里化：接收一个函数作为参数，经柯里化之后，返回的函数也能传参数
 * @param {*} func
 * @returns
 */
const curry = (func)  => {
  return function curried(...args){
    if(args.length >= func.length){ // func.length，func函数参数长度
      return func.apply(this, args); // 如果返回的函数传入的参数个数大于等于原函数参数的个数，则直接调用原函数，并将返回函数的参数作为原函数的参数传入
    }else{
      return function(..._args){
        return curried.apply(this, [...args, ..._args]);
      }
    }
  }
}

function add1(x, y, z){
  return x + y + z;
}

const add = curry(add1);

console.log(add(1,2,3));
console.log(add(1)(2,3));
console.log(add(1,2)(3));
console.log(add(1)(2)(3));
