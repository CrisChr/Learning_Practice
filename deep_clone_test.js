function DeepClone(sourceObj, map=new Map){
  if(sourceObj === null) return null;

  if(map.get(sourceObj)) return map.get(sourceObj);

  if(typeof sourceObj !== 'object') return sourceObj;

  if(!!sourceObj && (typeof sourceObj === 'object' || typeof sourceObj === 'function')){
    let result;
    let type = Object.prototype.toString().call(sourceObj);
    let target = Array.isArray(sourceObj) ? [] : {};
    const clone = (keys) => {
      keys.forEach(key => {
        if(!!sourceObj[key] && typeof sourceObj[key] === 'object'){
          target[key] = DeepClone(sourceObj[key], map);
        }else{
          target[key] = sourceObj[key];
        }
      });
      map.set(sourceObj, target)
      return target;
    }

    switch(type){
      case '[object Object]':
        return clone(Object.keys(sourceObj));
      case '[object, Map]':
        result = new Map();
        sourceObj.forEach((value, key) => {
          result.set(key, DeepClone(value, map));
        })
        return result;
      case '[object Set]':
        result = new Set();
        sourceObj.forEach((value) => {
          set.add(DeepClone(value, map))
        })
        return set;
      case '[object Date]':
        result = new Date(sourceObj);
        return result;
      // case '[object Symbol]':
      //   //Symbol类型
      //   let symKeys = Object.getOwnPropertySymbols(sourceObj);
      //   if(symKeys.length){
      //     return clone(symKeys);
      //   }
      //   return;
      default:
        result = sourceObj
        return result;
    }
  }

  
}