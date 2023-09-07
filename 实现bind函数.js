// 一个简单的bind实现
Function.prototype.myBind = function(context){
  const self = this;
  return function(){
    return self.apply(context);
  }
}
// const foo = {value: 1};
// function bar(){
//   return this.value;
// }
// const bindFoo = bar.myBind(foo);
// console.log(bindFoo());

// 传参的实现
/**
 * bind支持柯里化传参，即在调用bind函数的时候传递一个或多个参数，在执行bind返回的函数的时候再传递一个参数
 */
Function.prototype.myBind_1 = function(context){
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1); // 获取bind函数从第二个参数到最后一个参数
  return function(){
    const bindArgs = Array.prototype.slice.call(arguments); // 这时是bind返回的函数的参数
    return self.apply(context, [...args, ...bindArgs]); // 此时的context只有要foo，因为Array.prototype.slice会改变原数组
  }
}
// const foo = {age: 22};
// function bar(name, conuntry){
//   console.log(this.age);
//   console.log(name, conuntry);
// }
// const bindFoo_1 = bar.myBind_1(foo, 'Red');
// bindFoo_1('Japan');

// 构造函数效果的实现
/**
 * 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
 * 也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
 */
Function.prototype.myBind_2 = function(context){
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const myBind = function(){
    const bindArgs = Array.prototype.slice.call(arguments);
    /**
     * 作为构造函数时，this指向实例，将绑定函数的this指向实例
     * 作为普通函数时，this指向window，将绑定函数的this指向context
     */
    return self.apply(this instanceof myBind ? this : context, [...args, ...bindArgs]);
  }
  /**
   * 注意：这里要修改返回函数的原型为绑定函数的原型，这样在原型链上，实例的_proto_就是绑定函数的prototype
   * 这样构造函数就可以继承原型上的属性和方法了
   */
  myBind.prototype = this.prototype;
  return myBind;
}

var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value); // 绑定时的this值失效
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';
bar.prototype.girlFriend = 'Mary';

var bindFoo = bar.myBind_2(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
console.log(obj instanceof bar)
// shopping
// kevin
// true

bindFoo.prototype.girlFriend = 'Sara';
console.log(bar.prototype.girlFriend);


/**
 * 上例中，最后修改bind返回函数的原型属性时（bindFoo.prototype.girlFriend = 'Sara'），也修改了绑定函数bar的原型属性（bar.prototype.girlFriend）
 * 这是因为我们将bind绑定函数（上例中的bar）的原型赋值给了bind返回函数（上例中的bindFoo）的原型上
 * 可以通过一个中间函数来避免
 */
Function.prototype.myBind_3 = function(context){
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const F = function(){};
  const myBind = function(){
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof myBind ? this : context, [...args, ...bindArgs]);
  }
  F.prototype = this.prototype;
  myBind.prototype = new F();
  return myBind;
}


// test

Function.prototype.bindB = function(){
  
}