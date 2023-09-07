const Singleton = function(name){
  this.name = name;
  this.instance = null;
}

Singleton.prototype.getName = function(){
  console.log(this.name);
}

Singleton.getInstance = function(name){
  if(!this.instance){ // 单例模式的一个重要特点就是：全局只有一个实例可访问
    this.instance = new Singleton(name);
  }
  return this.instance;
}

const a = Singleton.getInstance('aa');
const b = Singleton.getInstance('bb');

a.getName();
b.getName();