# webpack

## 编译速度优化
  
  1. 引入speed-measure-webpack-plugin插件对打包过程中每个plugin和loader执行的时间

  2. 缓存编译结果：

    cache-loader

  3. 多线程编译：

    HappyPack

  4. 分开打包业务文件和库文件：

    DLLPlugin ———— 因为库文件经常改动的可能性比较小，在独立打包库文件时会生成一个manifest.json文件

## 打包体积优化

  1. 代码分片：
  
    SplitChunksPlugin
  
  2. 异步加载：

    - import(xxx).then()，配置babel插件@babel/plugin-syntax-dynamic-import

    - React.lazy()

  3. External：

    通过CDN加载外部依赖

  4. 按需加载：

    babel-plugin-import

  5. Tree-shaking

    tree-shaking是基于rollup的按需导入，并且只针对使用es6模块，因为要静态分析，如果是CommonJs方式引入的模块，要配置Babel（{"presets": ["env", {"modules":false}]}）

    tree-shaking不是百分百有效，主要原因有：
      * rollup只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉
      * javascript动态语言的特性使得静态分析比较困难
