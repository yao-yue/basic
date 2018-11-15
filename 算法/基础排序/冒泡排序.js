// 冒泡排序主要思想：比较任意两个相邻的项，如果第一个比第二个大，则交换他们。
// 一趟冒泡会将数组里面最大的数字归到最右边。故内循环可以减去外循环中已经跑过的轮数
// 向泡泡一样，对每一项进行冒泡，如果够大就往上冒

const  bubleSort = (array) => {
    let length = array.length;
    //数组的每一项都经过一轮冒泡
    for(let i = 0; i < length; i++) {
        //优化--从内循环减去外循环中已经跑过的轮数，可以避免内循环中不必要的比较
        //关于已跑过的轮数：i的值为数组末尾已经冒好了泡的数字个数
        for(let j = 0; j < length-1-i; j++) {
            if (array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
}

let a = [2,7,6,9,1,45,36,75];
console.log(a)
bubleSort(a);
console.log(a)