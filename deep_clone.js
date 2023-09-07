function DeepClone(source, hash=new WeakMap()){
  if(source === null) return null;

  //为了解决循环引用和相同引用的问题，存放已经递归到的目标对象
  if(hash.get(source)) return hash.get(source);

  //基本数据类型
  if(source && (typeof source !== "object")) return source;

  //其它类型：Map、Set、Date、正则
  if(source && (typeof source === "object" || typeof source === "function")){
    let result;
    //Array类型
    let target = Array.isArray(source) ? [] : {};
    let type = Object.prototype.toString.call(source);

    //引用类型的深拷贝函数
    let clone = (keys) => {
      keys.forEach(key => {
        if(source[key] && (typeof source[key] === "object")){
          target[key] = DeepClone(source[key]);
        }else{
          target[key] = source[key];
        }
      });
      hash.set(source, target);
      return target;
    }

    switch(type){
      case "[object Object]":
        return clone(Object.keys(source));
      case "[object Map]":
        result = new Map();
        source.forEach((value, key) => {
          result.set(key, DeepClone(value, hash))
        })
        return result;
      case "[object Set]":
        result = new Set();
        source.forEach((key, value) => {
          result.add(DeepClone(value, hash));
        })
        return result;
      case "[object Symbol]":
        //Symbol类型
        let symKeys = Object.getOwnPropertySymbols(source);
        if(symKeys.length){
          return clone(symKeys);
        }
        break;
      case "[object Date]":
        result = new Date(source);
        return result;
      default:
        result = source;
        return result; //正则
    }
  }
}

let a = 66;
let b = DeepClone(a);
// console.log(b);

let c = {d: 88, e: {f:666, g:999}};
let h = DeepClone(c);
h.d = 233;
// console.log(c, h);

let i = new Map();
i.set("name", "John");
i.set("age", 25);
let j = DeepClone(i);
j.set("name", "Selina");
// console.log(i, j);

let k = new Set();
k.add(1);
k.add(2);
k.add(3);
let l = DeepClone(k);
l.delete(2);
// console.log(k, l);

let m = new Date("1993/05/16");
let n = DeepClone(m);
n.setMonth(6);
// console.log(m.toLocaleDateString(), n.toLocaleDateString());

let o = new RegExp(/^[0-9]*$/);
let p = DeepClone(o);
p = /^[a-zA-Z]*$/;
console.log(o, p);
