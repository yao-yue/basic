/*
*   模块化 
    - 在Node中，一个JS文件就是一个模块
    - 在Node中，每一个js文件中的js代码都是独立运行在一个函数中
        而不是全局作用域，所以一个模块中的变量和函数在其他模块中无法访问
*
*/

console.log("我是一个模块！我是module.js");  
var x = 10;
var y = 20;

// 我们可以用通过exports 来想外部暴露变量和方法
//    只需要将需要暴露给外部的变量和方法设置为exports的属性即可

exports.x = "我是module.js中的x";
