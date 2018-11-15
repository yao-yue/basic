//选择排序是一种原址比较排序算法。
//选择排序思路： 找到数据结构中的最小值放第一位，第二小的放在第二位..

const selectionSort = (array) => {
    let length = array.length, 
        indexMin;
    // 外循环迭代数组，控制迭代轮次，  i -> 下一个最小值
    // 每次外循环都将产生一个最小值，放置数组的左边，故每次内循环都是从i索引位置开始比较
    for(let i = 0; i < length; i++) {
        indexMin = i;
        for(let j = i; j < length; j++) {
            // 找到最小值的索引indexMin
            if(array[indexMin] > array[j]) {
                indexMin = j;
            }
        } 
        // 把i索引的值和indexMin索引的值进行交换
        if(i !== indexMin) {
            let temp = array[i];
            array[i] = array[indexMin];
            array[indexMin] = temp;
        }
    }
}

let a = [2,7,6,9,1,45,36,75];
console.log(a)
selectionSort(a);
console.log(a)