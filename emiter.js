class EventEmiter{
  constructor(){
    this.eventListener={};
  }
  on(eventName, callback){
    if(!this.eventListener[eventName]){
      this.eventListener[eventName] = [];
    }
    this.eventListener[eventName].push(callback);
  }
  off(eventName, fn){
    const callbacks = this.eventListener[eventName];
    for(let i=0; i < callbacks.length; i++){
      if(callbacks[i] === fn){
        callbacks.splice(i, 1);
        break;
      }
    }
  }
  once(eventName, fn){
    let on = () => {
      fn.apply(this, arguments);
      this.off(eventName, on);
    }
    this.on(eventName, on);
  }
  emit(eventName, data){
    const callbacks = this.eventListener[eventName];
    callbacks && callbacks.forEach(cb => cb(data));
  }
}


const em = new EventEmiter();
const af = (data) => {
  console.log(`fuck ${data}`);
}
em.on('a', af);
em.on('a', () => console.log('fucking....'));
em.emit('a', 'her')
em.off('a', af);

em.emit('a', af)
em.once('b', () => console.log('i am b'));
em.emit('b');
em.emit('b');
