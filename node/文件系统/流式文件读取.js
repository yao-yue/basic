/**
    流式文件读取也适用于一些比较大的文件
 */

 var fs = require("fs");

 //创建一个可读流
 var rs = fs.createReadStream("an.jpg");
//创建一个可写流
var ws = fs.createWriteStream("a.jpg")
 rs.once("open", function () { 
     console.log("可读流打开了~~~~");
 });

 rs.once("close", function () {
    console.log("可读流关闭了~~~~");
    //数据读取完毕，关闭可写流
    ws.end();
});

ws.once("open", function () {
    console.log("可写流打开了~~");
});

ws.once("close", function () {
    console.log("可写流关闭了~~");
});

//如果要读取一个可读流中的数据，必须要为可读流绑定一个data事件，data事件绑定完毕，他会自动开始读取数据
rs.on("data", function (data) {
    console.log(data);
    //将读取到的数据写入到可写流中
    ws.write(data);
});

//pipe() 可将可读流中的内容直接输出到可写流中
//与上节代码功能一样
// rs.pipe(ws);

