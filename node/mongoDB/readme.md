##MongoDB简介
- MongoDB是为了快速开发互联网Web应用设计的数据库系统
- 设计目标是极简、灵活、快速、作为Web应用栈的一部分
- MongoDB的数据模型是面向文档的，所谓文档是一种类似于JSON的结构（BSON）

##SQL
- 结构化查询语言
- 关系数据库都用SQL来操作

##安装MongoDB
- 配置环境变量
    找到bin目录添加到PATH
- 在C盘根目录
  + 创建一个文件夹 data
  + 在data中创建一个文件夹 db
- 打开cmd命令行窗口
    + 输入mongod 启动mongodb服务器 没有异常即成功
    + mongod --dbpath 路径 --port 端口号      这样就可以来进行设置端口号和保存位置
    注意端口号不能超过65535
- 再打开一个cmd窗口
    + 输入 mongo 链接mongodb， 没异常即成功

- 将MongoDB设置为系统服务，可以自行在后台启动
    1. 在db同目录下建一个log文件夹
    2. 配置创建文件
        在bin同级建一个mongod.cfg
    3. 以管理员身份打开cmd
        sc.exe create MongoDB binPath= "\"mongod的bin目录\mongod.exe\" --service  --config=\"mongo的安装目录\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
        sc.exe create MongoDB binPath= "\"E:\Program Files\MongoDB\Server\bin\mongod.exe\" --service --config=\"E:\Program Files\MongoDB\Server\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
    4. 在服务中 启动mongodb服务
    5. 配置出错的话在控制台输入 sc delete MongoDB 再重新来一次


##数据库
- 数据库的服务器
    + 服务器用来保存数据
    + mongod用来启用服务器
- 数据库的客户端
    + 客户端用来操作服务器，对数据进行整改删查操作
    + mongo 用来启动客户端


