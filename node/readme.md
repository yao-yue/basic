##EcmaScript标准的缺陷
- 没有模块系统
- 标准库较少
- 没有标准接口
- 缺乏管理系统

##CommonJS规范
- CommonJS规范的提出，主要是为了弥补当前JavaScript没有标准的缺陷
- CommonJS规范为JS指定了一个美好的愿景，希望JS能够在任何地方运行
- CommonJS对模块的定义非常简单
  * 模块引用
  * 模块定义
  * 模块标识

###模块的标识
- 模块的标识就是模块的名字或路径
  + Node通过模块的标识来寻找模块，对于核心模块npm中下载的模块
  可直接使用模块的名字来对其进行引入
    > var fs = require("fs");
  + 对于自定义的文件模块，需要通过文件的路径来对模块进行引入

##包 package
- CommonJS的包规范允许我们将一组相关的模块组合到一起，形成一套完整的工具
- CommonJS的包规范由包结构和包描述文件两个部分组成
  + 包结构 用于组织包中的各种文件
  + 包描述文件 描述包的相关信息，以供外部读取分析

###包结构
- 包实际上就是一个压缩文件，压解以后还原为目录。符合规范的目录，应该
包含如下文件：
   + package.json 描述文件  ----！最重要的
   + bin  可执行二进制文件
   + lib  js代码
   + doc  文档
   + test 单元测试
###包描述文件
- 包描述文件用于表达非代码相关的信息，他是一个JSON格式的文件package.json
  位于包的根目录下，是包的重要组成部分
- package.json中的字段
  name description version keywords.....
- 在JSON中不能写注释


##NPM(Node Package Manager)
- CommonJS包规范是理论，NPM是其中一种实践
- 对于Node而言，NPM帮助其完成了第三方模块的发布、安装和依赖等，借助
NPM，Node于第三方模块之间形成了很好的一个生态系统
- 相当于一个“APPStore”的作用，可以去NPM上发布包，下载包

###NPM命令
- npm -v >查看版本
- npm >帮助说明
- npm search 包名   >搜索模块包
- npm install/i 包名   > 在当前目录安装包
- npm install 包名 -g  >全局模式安装包(全局安装的包一般都是一些工具)
- npm remove/r  包名   > 移除包
- npm install 包名  --save  >**安装包并添加到依赖中**
- npm install >下载当前项目所依赖的包

