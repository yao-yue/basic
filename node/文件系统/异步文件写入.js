/**
 * 异步文件写入
 * fs.open(path,flags[, mode], callback)
 *  - 用来打开一个文件
 *  - 异步调用的方法，结果都是通过回调函数的参数返回的
 *  - 回调参数两个参数
 *      err 错误对象，若果没有错误则为NULL
 *      fd  文件的描述符
 * fs.close(fd, callback)关闭文件
 */

 var fs = require("fs");
 fs.open("hello2.txt", "w", function (err, fd) {
     //判断是否出错
     if(!err) {
         console.log(fd);
         //如果没有出错，则对文件进行写入操作
         fs.write(fd, "这是异步写入的内容", function (err) {
            if(!err) {
                console.log("写入成功！");
            }
            //关闭文件
            fs.close(fd, function (err) {
                if(!err) {
                    console.log("文件已关闭");
                }
            });
         });
     }else {
         console.log(err);
     }
 });