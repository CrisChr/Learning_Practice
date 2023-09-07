const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECT = 'REJECT';

class MyPromise {
  constructor(executor){
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    const resolve = value => {
      if(this.status === PENDING){
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach(fn => fn());
      }
    }

    const reject = reason => {
      if(this.status === PENDING){
        this.status = REJECT;
        this.reason = reason;
        this.onRejectedCallback(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected){
    if(this.status === FULFILLED){
      onFulfilled(this.value);
    }

    if(this.status === REJECT){
      onRejected(this.reason);
    }

    if(this.status === PENDING){
      this.onFulfilledCallback.push(() => onFulfilled(this.value));
      this.onRejectedCallback.push(() => onRejected(this.reason));
    }
  }

  static all(promiseArr){
    const r = promiseArr.reduce((init, pro) => {
      pro.then(res => {
        init.push(res);
      });
      if(init.length ===promiseArr.length){
        return init
      }
    }, []);
    return new MyPromise((resolve) => {
      resolve(r);
    });
  }
}