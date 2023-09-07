function Base(name){
    this.sex = 0;
    this.name = name || 'base';
    this.hello = function(){
        console.log("hello " + name);
    };
}
Base.prototype.say = function(){
    console.log('name:'+this.name);
};
function Extend(name,num){
    Base.call(this,name);
    this.num = num || 0;
}

Extend.prototype = new Base();
Extend.prototype.constructor = Extend;
const one = new Extend('one',2);

console.log(Extend.__proto__); // Base 
console.log(one instanceof Extend); // true
console.log(one instanceof Base); // true
console.log(one.constructor === Extend); //true
console.log(one.__proto__ === Extend.prototype); // true

console.log(one.name); // one
console.log(one.sex); // 0
console.log(one.num); // 2
one.say(); // name: one
one.hello(); // hello one
