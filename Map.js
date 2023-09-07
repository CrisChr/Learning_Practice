const map = new Map([
  ['name', 'red'],
  ['age', 26]
])

console.log(map.get('name'))

map.set(1, 'aaa')
   .set(1, 'bb')

console.log(map.get(1))

map.set(['z'], 666)
console.log(map.get(['z']))


const map0 = new Map().set(1, 'a').set(2, 'b').set(3, 'c')

console.log([...map0]) //通过扩展运算符，将Map结构转化成二维数组解构

const array = [...map0].filter(([key, value]) => key < 2) //转化成数组后就可以用数组方法了
console.log(array)

const newmap = new Map(
  [...map0].filter(([key, value]) => key < 2)
)
console.log(newmap)