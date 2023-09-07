/**
 * Promise A+规范：https://promisesaplus.com/
 */

const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

function promiseResolution(promise2, x, resolve, reject){
  if(promise2 === x){
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'));
  }

  let isCalled = false;

  if((typeof x === 'object' && x !== null) || typeof x === 'function'){ // 返回的是个函数
    try {
      let then = x.then; // 函数有then属性
      if(typeof then === 'function'){ // then是个函数，那么基本可以判定是Promise
        then.call(x, (y) => {
          if(isCalled) return;
          resolve(y);
          isCalled = true;
          promiseResolution(promise2, y, resolve, reject); // 递归调用，y可能是个Promise函数
        }, (r) => {
          if(isCalled) return;
          reject(r);
          isCalled = true;
        })
      }else{
        resolve(x); // 返回的是个简单对象或值类型
      }
    } catch (error) {
      if(isCalled) return;
      reject(error);
      isCalled = true;
    }
  }else{ // 返回的是个简单对象或基本值类型
    resolve(x);
  }
}

class MyPromise {
  constructor(executor){
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if(this.state === 'PENDING'){
        this.state = FULFILLED;
        this.value = value;

        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if(this.state === 'PENDING'){
        this.state = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try{
      executor(resolve, reject);
    }catch(err){
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    const promise2 = new MyPromise((resolve, reject) => {
      if(this.state === 'FULFILLED'){
        try {
          setTimeout(() => {
            let x = onFulfilled(this.value);
            promiseResolution(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      }
      if(this.state === 'REJECTED'){
        try {
          setTimeout(() => {
            let x = onRejected(this.reason);
            promiseResolution(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      }
      if(this.state === 'PENDING'){
        this.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onFulfilled(this.value);
              promiseResolution(promise2, x, resolve, reject);
            }, 0);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onRejected(this.reason);
              promiseResolution(promise2, x, resolve, reject);
            }, 0);
          } catch (error) {
            reject(error);
          }
        })
      }
    })
    return promise2;
  }

  catch(errorCallback){
    return this.then(null, errorCallback);
  }

  static resolve(value){
    return new MyPromise(resolve => {
      resolve(value);
    })
  }

  static reject(reason){
    return new MyPromise((_, reject) => {
      reject(reason);
    })
  }

  static all(promises){
    let arr = [], count = 0;
    function process(i, res, resolve){
      count++;
      arr[i] = res;
      if(count === promises.length){
        resolve(arr);
      }
    }
    return new MyPromise((resolve, reject) => {
      for(let i=0; i<promises.length; i++){
        promises[i].then(result => {
          process(i, result, resolve);
        }, reason =>{
          throw new Error(reason);
        })
      }
    })
  }
}

module.exports = MyPromise;

// =======Test=========
const promise1 = new MyPromise((resolve, reject) => {
  resolve();
}).then(res => {
  // console.log('promise1 fulfilled result: ', res);
  // return res; // 返回一个值类型
  return new MyPromise((resolve, reject) => {
    resolve(2);
  }); // 返回一个Promise函数
}, reason => {
  console.log('promise1 rejected reason: ', reason);
  return reason;
});

const promise2 = promise1.then(res => {
  console.log('promise2 fulfilled result: ', res);
});

const promise3 = MyPromise.reject(1).then(null, err => console.log('promise3 rejected result: ', err))