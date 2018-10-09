/**
 * 1、同步文件读取
 * 2、异步文件读取
 * 3、简单文件读取
    fs.readFile(path[, options], callback)
    fs.readFileSync(path[, options])
    callback回调函数，通过回调函数将读取到的内容返回(err, data)
        err 错误对象
        data 读取到的数据会返回一个buffer  通用性高 可以读多种文件
 * 4、流式文件读取
 */

 var fs = require("fs");
 fs.readFile("an.jpg", function(err, data) {
     if(!err) {
         console.log(data);
        //将data写入到文件中
        fs.writeFile("hello.jpg", data, function(err) {
            if(!err) {
                console.log("success!");
            }
        })
     }
 }) 