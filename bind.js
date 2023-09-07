// 实现一个bind
Function.prototype.myBind = function(){
  const self = this; // 调用myBind的函数（bar）
  const args = Array.prototype.slice.call(arguments, 1); // 获取myBind函数从第二个参数到最后一个参数
  const target = Array.prototype.shift.call(arguments); // 获取myBind函数第一个参数，即是被bind的对象（foo）
  return function(){
    return self.apply(target, [...args, ...arguments]); // 这里返回的函数也可以传参哦
  }
}


const foo = {value: 1};
function bar(name, age){
  console.log(this.value);
  console.log(name, age);
}

const binded = bar.myBind(foo, 'Red', 28);
binded();

// 实现apply
Function.prototype.myApply = function(){
  const self = this;
  const target = Array.prototype.shift.call(arguments);
  const args = Array.prototype.slice.call(arguments, 1);
  self.apply(target, args);
}
// bar.myApply(foo, ['Mary', 25]);


// 实现call
Function.prototype.myCall = function(ctx, ...args){
  const _ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx); // 要更改的对象为null或undefined的时候，返回全局global This（node和Browser共用）
  const key = Symbol('__fn__'); // 定义唯一属性
  Object.defineProperties(_ctx, key, {
    enumerable: false,
    value: this
  })
  _ctx[key] = this;
  const result = _ctx[key](...args);
  delete _ctx[key];
  return result
}
bar.myCall(foo, ['Mary', 25]);

/**
 * 以下是面试题
 */

// 假设本地机器无法做加减乘除法，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现
// const addRemote = async (a, b) => new Promise(resolve => {
//   setTimeout(() => resolve(a + b), 1000)
// })

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
// async function add(...inputs) {
//   // 你的实现
//   const arr = [...inputs];
//   const sum = arr.slice(0, arr.length-1).reduce((init, item) => {
//     init = init + item;
//     return init;
//   }, 0);
//   const remote = await addRemote(sum, arr[arr.length-1]);
//   return new Promise(resolve => resolve(remote));
// }

// 请用示例验证运行结果:
// add(1, 2)
//   .then(result => {
//     console.log(result) // 3
//   })

// add(3, 5, 2)
//   .then(result => {
//     console.log(result) // 10
//   })

  