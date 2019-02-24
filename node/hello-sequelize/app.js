const Sequelize = require('sequelize');
const config = require('./config')

//创建一个sequelize对象实例
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
})

//通过sequelize.define()返回的Pet称为Model，它表示一个数据模型
var pets = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT 
},{
    timestamps: false    //关闭Sequelize的自动添加timestamp的功能
}
)

var now = Date.now();

// pets.create({
//     id: 'g-' + now,
//     name: 'hbw\'s dot',
//     gender: true,
//     birth: '2018-11-11',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function(p) {
//     console.log('created' + JSON.stringify(p))
// }).then(function(err) {
//     console.log('failed:' + err)
// })
(async () => {
    var dog = await pets.create({
        id: 'b-' + now,
        name: 'black',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();

//create 的就是对象实例， findAll()也是返回的对象实例

// (async () => {
//     var pets = await pets.findAll({
//         where: {
//             name: 'black'
//         }
//     });
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets) {
//         console.log(JSON.stringify(p));
//     }
// })();

//更新数据  对查询到的实例调用save()方法；
// (async () => {
//     var p = await queryFromSomewhere();
//     p.gender = true;
//     p.updatedAt = Date.now();
//     p.version ++;
//     await p.save();
// })();
// //如果要删除数据，可以对查询到的实例用destory()方法
// (async () => {
//     var p = await queryFromSomewhere();
//     await p.destroy();
// })();