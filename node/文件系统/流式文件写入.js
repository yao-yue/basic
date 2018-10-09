/**
    同步异步、简单文件的写入都不适合大文件的写入，性能比较差，容易导致内存溢出
 */

 var fs = require("fs");

//流式文件写入
//创建一个可写流
/**
 *   fs.createWriteStream(path[, options])
        -options 配置的参数

    on(事件字符串， 回调函数)
        - 可以为对象绑定一个事件
    once 可以为对象绑定一个一次性的时间，改事件将会在一次触发后自动失效
 */
var ws = fs.createWriteStream("hello.txt");
//可以通过监听流的open和close事件来监听流的打开和关闭
ws.once("open", function () {
    console.log("流打开了~~~");
})

ws.write("通过可写流文件的内容");
ws.write("我喝了好多开水！");


//关闭流    不用close,close关闭的是另一头
ws.end();