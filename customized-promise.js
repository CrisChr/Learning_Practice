
/**
 * 简单的手写Promise
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';



function resolvePromise(x, promise, resolve, reject){
  if(x === promise) return reject(new TypeError ('Chaining cycle detected for MyPromise'));

  let called = false;

  if((typeof x === 'object' && x !== null) || typeof x === 'function'){
    try {
      let then = x.then;
      if(typeof then === 'function'){
        then.call(x, (y) => {
          if(called) return;
          called = true;
          resolvePromise(y, promise, resolve, reject);
        }, (r) => {
          if(called) return;
          called = true;
          reject(r);
        });
      }else{
        resolve(x);
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

/**
 * 如果executor是个异步函数，比如setTimeout
 */

class MyPromise {
  construct(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    let resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach(fn => fn());
      }
    }

    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallback.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e};
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedCallback.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }

  static resolve(value){
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason){
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promiseArr){
    const resArr = promiseArr.reduce((init, promise) => {
      promise.then((res) => {
        init.push(res);
      });
      if(init.length === promiseArr.length){
        return init;
      }
    }, []);
    return new MyPromise((resolve, reject) => {
      resolve(resArr);
    });
  }
}

/**
 * Example
 */
// let promise1 = new MyPromise((resolve, reject) => {
//   resolve('hello p1');
// });

// const p2 = promise1.then((r) => {
//   return new MyPromise((resolve, reject) => {
//     resolve(r);
//   });
// })
// .then(value => {
//   console.log(value);
// }, reason => console.log(reason));

// MyPromise.resolve('one').then(res => {
//   console.log(res);
// })

new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('time out');
    resolve('done');
  }, 2000);
}).then(res => {
  console.log(res);
})
