## webpack 安装 
安装本地的webpack 
yarn add webpack webpack-cli -D  
npm install webpack webpack-cli -D
-D 表示development  开发环境 

## webpack 可以进行0配置
- 直接运行 npx webpack 
- 打包工具->输出后的结果(js模块)
- 打包（直接js的模块化）

## 手动配置webpack
- entry 入口可以是相对路径  
- output 出口 输出  必须是绝对路径
  - path 输出路径必须是绝对路径
  - filename  输出的文件名默认 main.js
- mode 的值 一般为两个  development 和 production 
  1.development 开发环境
  2.production  生产环境
- 默认配置文件的名字是webpack.config.js
- webpack 是node写出来的 
- webpack-dev-server -D
```
 port:3000, #端口好
 progress:true, #显示进度条
 contentBase:'./dist', #目录
 compress:true  #是否开启gzip压缩
```

## 配置脚本 package.json 
- "build": "webpack --config webpack.config.js",
- "dev": "webpack-dev-server"
- 这样就可以通过npm run dev/npm run build执行相关的命令

## 处理html 
- 当前插件需要配置plugin -D 
- yarn add  html-webpack-plugin -D
- 删除dist目录 在src下面建立一个index.html
- 每一个插件都是同new  调用 例子
```
plugins:[
    new HtmlWebpackPlugin({
        template:"./src/index.html",
        filename:"index.html",
        hash:true
    })
]
```
```
template:'./src/index.html',//模板
filename:'index.html', //编译后的名字
hash:true,//加hash值 
minify:{ //压缩配置   
    removeAttributeQuotes:true, //去除双引号
    collapseWhitespace: true,  //折叠去除空格
}
```

## 直接给文件加hash值 
```
filename:'bundle[hash].js'
可以用数字设置hash值的长短 
filename:'bundle[hash:8].js'
```
## 处理样式
- . 通过require require('/index.css') 报错如下 

```
Module not found：Can't resolve '/index.css' in '/Users/ruanye/Desktop/webpacklesson/src

```
- . 配置module,配置rules数组，表示很多规则，用正在匹配js、css等
- use 后面的写法是
  - 1.字符串 use:'css-loader'
  - 2.数组 use:["style-loader","css-loader"]
  - loader的执行顺序是冲右到左执行 是从下到上执行的
```
 {
     test:'/\.css/',//配置到css
     use:[]
 }
```
- .use 可以直接写loader，也可以写对象，写对象的时候可以写配置
yard add css-loader style-loader -D
```
 {
   loader:'style-loader',
    options:{
     insertAt:'top'  //css 放置位置可以绝对css的优先级
  }
```
- 配置less编译(less->css) 因为从右向左，从下到上执行 所以写在下边和右边
yarn add less less-loader -D

##  抽离css 
- yarn add  mini-css-extract-plugin -D
- 用MiniCssExtractPlugin.loader代替style-loader抽离css样式
- 在loader写法
```
   {
      test:/.less$/,
      use:[MiniCssExtractPlugin.loader,"css-loader","less-loader"]
  },
```

## 使用postcss-loader添加浏览器前缀 
- yarn add postcss-loader autoprefixer -D 
- 放到所有css-loader后面，执行顺序原因
- 需要配置postcss默认文件 名字postcss.config.js
- Error: No PostCSS Config found
```
module.exports={
    plugins:[require('autoprefixer')]
}
```


## 配置优化项
- yarn add optimize-css-assets-webpack-plugin  uglifyjs-webpack-plugin -D 
optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, //缓存 
        parallel: true, //是否并发打包
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  mode 改成 production
## 处理js es6转化成es5
- yarn add babel-loader @babel/core @babel/preset-env
- @babel/core babel 核心模块
- @babel-preset-env 标准语法转化成低级语法
- babel 官网 
- class 和 es6@(装饰器需要安装额外的插件) 并且添加plugins集合
```
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
``` 
- babel 插件中最常用的插件 
- promise genarater 需要 @babel/plugin-transform-runtime   比较常用的 转换promise
yarn add  @babel/plugin-transform-runtime 
生产环境也需要runtime 
yarn add @babel/runtime 
- es7的一些语法需要其他的 inclueds 补丁包   不需要配置只需要引入  index.js
yarn add @babel/polyfill;
require("@babel/polyfill");

## 配置需要设置loader的文件路径  

- include 包含  include:path.resolve(__dirname,'src'), 
- exclude 不包含  exclude:/node_modules/

## babel 也可以独立进行配置，文件名字.babelrc
- 配置的时候loader  直接写use:babel-loader 其他配置写在 .babelrc
- 
## js语法校验
- eslint 官网 https://eslint.org/demo/
- yarn add eslint eslint-loader -D
- 添加 enforce pre  强制先执行 previons 前置loader 
- .eslint.js   
```
//写法
module.expors = {
  // 写代码
}
```
- .eslint.ignore elsint 的忽略项
- 

## 第三方模块
- yarn add jquery

```
//  把$抛出为全局变量  
import $ from "exprose-loader?$!jquery";//内联写法
//正常写法 module.rulesp[];
{
    test:require.resolve("jquery"),
    use:"expose-loader?$"
},
//第三种写法 在每个模块上注入$模块 这里window.$现在是未赋值  因为不是全局变量
let webpack = require("webpack");
new webpack.ProvidePlugin({ //这里是注入每个模块上的
    $:"jquery"
})
```

## 配置忽略项   不打包 














