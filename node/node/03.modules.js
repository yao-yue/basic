//引入其他的模块

// 在node中，通过requir（）函数来引入外部的模块
//     require（）可以传递一个文件的路径作为参数，node将会自动根据该路径来引入外部模块这里
//     路径，如果使用相对路径必须以.  or .. 开头

// 使用require()引入模块以后，该函数会返回一个对象，这个对象代表的是引入的模块

 
var md = require("./module.js");
console.log(md);