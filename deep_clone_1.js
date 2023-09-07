function DeepClone(source, map=new WeakMap()){
  if(!source) return null;
  if(map.get(source)) return map.get(source);
  if(getType(source) === '[object Object]'){
    let target = Array.isArray(source) ? [] : {};
    for(key in source){
      target[key] = DeepClone(target[key]);
    }
    map.set(source, target);
    return target;
  }else{
    return source;
  }

  function getType(target){
    return Object.prototype.toString.call(target);
  }
}

console.log(DeepClone({
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [1,2,3,4]
}))