// 深度克隆机制： 拿到目标里面的每一项值，如果有对象、数组，继续深入拿，直到拿到的都是基本数据类型

function checkedType(target) {
    if(target===null) return "Null";
    if(target===undefined) return "Undefined";
    // console.log(Object.prototype.toString.call(target));
    // console.log(Object.prototype.toString.call(target).slice(8,-1));
    // console.log(Object.prototype.toString.call(target).slice(7,-1));
    return Object.prototype.toString.call(target).slice(7,-1);
}

function clone(target) {
    let result, targetType = checkedType(target);
    if(targetType == 'Object') {
        result = {};
    }else if(target === 'Array') {
        result = [];
    }else {
        return target;
    }

    // for...in语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。
    for(let i in target) {
        let value = target[i];      //value不包含key
        if(checkedType(value) === 'Object' || checkedType(value) === 'Array'){
            result[i] = clone(value)
        }
        result[i] = value;
    }
}


let obj1 = {dog: 'mimi', cat: 'wangwang', arr: [[1,34,5],24] };
let obj3 = {dog: 'tom'};