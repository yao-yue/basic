// module.exports与 exports

// 通过exports只用使用.的方式来向外暴露内部变量
//         exports.xxx = xxx
// 通过module.exports既可以通过点的方式也可以直接赋值
//         module.exports.xxx = xxx;
//         module.exports = {}

// 一个是修改变量一个是修改对象
module.exports = {
    name:'牛有道',
    age: 20,
    sayName:function () {
        console.log('我是道君牛有道!');
    }
};