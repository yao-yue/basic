### good start is a half of success!  :notes:

##初试
全局安装
yarn global add webpack webpack-cli

webpack-cli 是使用 webpack 的命令行工具

yarn add webpack -D 将webpack添加到package.json的依赖中去

然后我们创建一个 ./src/index.js 文件，可以写任意的 JS 代码。创建好了之后执行 npm run build 或者 yarn build 命令，你就会发现新增了一个 dist 目录，里边存放的是 webpack 构建好的 main.js 文件。

### 1
我们使用 webpack 构建时，默认的入口文件就是 ./src/index.js。
### 默认
webpack 运行时默认读取项目下的 webpack.config.js 文件作为配置。
### 分解
 webpack 的几个重要的概念：入口，loader，plugin，输出
### 需求
构建我们发布需要的 HTML、CSS、JS 文件
使用 CSS 预处理器来编写样式
处理和压缩图片
使用 Babel 来支持 ES 新特性
本地提供静态服务以方便开发调试
### 常用插件
1. html-webpack-plugin     HTML
2. css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。
<<如果需要单独把 CSS 文件分离出来，我们需要使用 extract-text-webpack-plugin 插件。>>
3. 处理图片文件
css-loader 会解析样式中用 url() 引用的文件路径，但是图片对应的 jpg/png/gif 等文件格式，webpack 处理不了
 file-loader 就是个不错的选择

###要点:  enhanced-resolve 来解析代码模块的路径
1. resolve.alias   写别名  引入模块可以简便些
alias: {
  utils: path.resolve(__dirname, 'src/utils') // 这里使用 path.resolve 和 __dirname 来获取绝对路径
}
alias: {
  utils$: path.resolve(__dirname, 'src/utils') // 只会匹配 import 'utils'
}
2. resolve.extensions
extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
// 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
import * as common from './src/utils/common' 可以省略后面的 .js .jsx
3. resolve.modules

### loader 配置
user:  [
    'style-loader',
    {
        'scss-loader',
        options: {
            importLoaders: 1
        } // 用对象表示 loader，可以传递 loader 配置等
    }
]
- loader 应用顺序 
loader 按照前置 -> 行内 -> 普通 -> 后置的顺序执行。所以当我们要确保 eslint-loader 在 babel-loader 之前执行时，可以如下添加 enforce 配置：
- ***使用noParse***
一些不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度。
使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。
module.exports = {
  // ...
  module: {
    noParse: /jquery|lodash/, // 正则表达式

    // 或者使用 function
    noParse(content) {
      return /jquery|lodash/.test(content)
    },
  }
}