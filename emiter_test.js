class MyEmiter {
  constructor(){
    this.eventListener = {}
  }
  on(eventName, fn){ // 订阅
    if(!this.eventListener[eventName]){
      this.eventListener[eventName] = [];
    }
    this.eventListener[eventName].push(fn);
  }

  off(eventName, fn){ // 取消订阅
    const callbacks = this.eventListener[eventName];
    for(let i=0; i<callbacks.length; i++){
      if(callbacks[i] === fn){
        callbacks.splice(i, 1)
        break;
      }
    }
  }

  emit(eventName){
    const callbacks = this.eventListener[eventName];
    callbacks.forEach(callback => {
      callback();
    })
  }
}

const em = new MyEmiter();
em.on('a', () => console.log('fucking...'));
em.on('b', () => console.log('ok fine...'));
em.on('a', () => console.log('logging...'))

em.emit('a');
em.emit('b');
