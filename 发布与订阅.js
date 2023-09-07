class EventEmitter{
  constructor(){
    this.eventListener = {}
  }

  on(eventName, callback){
    if(!this.eventListener[eventName]){
      this.eventListener[eventName] = [];
    }
    this.eventListener[eventName].push(callback);
  }

  off(eventName, fn){
    const callbacks = this.eventListener[eventName];
    const idx = callbacks.indexOf(fn);
    if(idx !== -1){
      callbacks.splice(idx, 1)
    }
  }

  once(eventName, fn){
    let onOnce = () => {
      fn.apply(this, arguments);
      this.off(eventName, onOnce);
    }
    this.on(eventName, onOnce);
  }

  emit(eventName){
    this.eventListener[eventName].forEach(cb => cb());
  }
}

const e = new EventEmitter();

const fn = () => {
  console.log('on a');
}

e.on('a', fn);

e.on('a', function(){
  console.log('on a 2');
});

e.once('b', function(){
  console.log('once b');
});

e.emit('a');

e.off('a', fn);

e.emit('a');
e.emit('b');
e.emit('b');
