function NewFactory(ctor, ...args){
  let obj = Object.create(ctor.prototype);
  const ret = ctor.apply(obj, args); // 改变this指向，这样obj就可以访问构造函数里的属性了
  return ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) ? ret : obj;
}

function Test(name){
  this.name = name;
}

Test.prototype.getName = function(){
  return this.name;
}

const c = NewFactory(Test, 'red');

console.log(c.getName());
