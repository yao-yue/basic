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