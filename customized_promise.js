const  PEDING = 'pending',
          FULFILLED = 'fulfilled',
          REJECTED = 'rejected';

// 记录resolve或reject是否被调用，两者中有一个被调用，另一个就不能再执行
let called = false;

function resolvePromise(promise2, x, resolve, reject){
  // 如果返回的类型是Promise，直接报错
  if(x === promise2) return reject(new TypeError('same promise error'));

  if((typeof x === 'object' && x !== null) || typeof x === 'function'){ // 如果返回的是个对象或函数，默认就是Promise
    try {
      let then = x.then; // 是Promise那么就有then方法
      if(typeof then === 'function'){
        then.call(x, (y) => { // 改变上下文，将then方法内的this指向返回的Promise函数
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject); // 解决then方法内返回多个Promise实例的情况
        }, (r) => {
          if(called) return;
          called = true;
          reject(r);
        })
      }else{
        resolve(x); // 如果不是函数类型则直接返回
      }
    } catch (error) {
      if(called) return;
      called = true;
      reject(error);
    }
  }else{
    resolve(x);
  }
}

class MyPromise{
  constructor(executor){
    this.status = PEDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if(this.status === PEDING){
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn()); // 发布
      }
    }

    const reject = (reason) => {
      if(this.status === PEDING){
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn()); // 发布
      }
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected){
    const promise2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED){
        try {
          setTimeout(() => {
            let x = onFulfilled(this.value); // onFulfilled可以返回Promise
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      }
      if(this.status === REJECTED){
        try {
          setTimeout(() => {
            let x = onRejected(this.value);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      }
      if(this.status === PEDING){
        // 订阅
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }
}

MyPromise.all = function(promises){
  let arr = [], count = 0;
  function process(i, res, resolve){
    count++;
    arr[i] = res;
    if(count === promises.length){
      resolve(arr);
    }
  }
  return new MyPromise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++){
      promises[i].then(res => {
        process(i, res, resolve);
      }, reason => {
        throw new Error(reason);
      })
    }
  });
}

// let p1 = new Promise((resolve, reject) => {
//   resolve('p1');
// });

// let p2 = p1.then((v) => {
//   return new Promise((resolve, reject) => {
//     resolve('Hello')
//   })
// }, r => {});

// p2.then(vv => {
//   console.log(vv);
// }, rr => {});

// let promise1 = new MyPromise((resolve, reject) => {
//   resolve('promise1');
// });

// let promise2 = promise1.then(value => {
//   return new MyPromise((resolve, reject) => {
//     resolve(value);
//   })
// }).then(v => {
//   console.log(v);
// }, () => {});

function Promise1(){
  return new MyPromise((resolve, reject) => {
    resolve('hello');
  })
}

MyPromise.all([Promise1]).then(res => {
  console.log(res)
})