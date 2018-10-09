/**
 * 简单文件写入
 * fs.writeFile(file, data[, options], callback)
 * fs.writeFile(file, data[, options])
 * options 对象参数
 * 
 * 文件读写flag: a 追加
                r 读
                w 写

 */

 var fs = require("fs");
 //注意\它会把他当成转译字符 要\\改成双斜杠
 fs.writeFile("C:\\Users\\Administrator\\Desktop\\hello.txt", "这是通过writeFile写入的内容", {flag:"a"}, function (err) {
    if(!err) {
        console.log("写入成功~~~");
    }else {
        console.log(err);
    }
 })