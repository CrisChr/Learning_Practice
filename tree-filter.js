let arr = [{
    id: 1,
    label: "一级 1",
    children: [{
      id: 11,
      label: "二级 1-1",
      children: [{
          id: 111,
          label: "三级 1-1-1"
        },
        {
          id: 112,
          label: "三级 1-1-2"
        }
      ]
    }]
  },
  {
    id: 2,
    label: "一级 2",
    children: [{
        id: 21,
        label: "二级 2-1"
      },
      {
        id: 22,
        label: "二级 2-2"
      }
    ]
  },
  {
    id: 3,
    label: "一级 3",
    children: [{
        id: 31,
        label: "二级 3-1"
      },
      {
        id: 32,
        label: "二级 3-3"
      }
    ]
  }
]
/**
 * 过滤Tree结构数组
 * @param {*} sourceTree
 * @param {*} val
 */
function f(sourceTree, val) {
  if (!Array.isArray(sourceTree)) {
    return;
  }
  console.log('sourceTree: ', sourceTree);
  let resArr = sourceTree.filter(item => {
    console.log('item: ', item)
    if (item.label.indexOf(val) > -1) {
      return true;
    } else if (!item.children) {
      console.log("======no children=======")
      return false;
    }
    console.log("----------------")
    item.children = f(item.children, val);
    console.log('after: ', item.children.length)
    return item.children.length;
  });

  console.log('resArr: ', resArr)
  return resArr;
}
// f(arr, "3")
console.log('Filter: ', f(arr, "2"));