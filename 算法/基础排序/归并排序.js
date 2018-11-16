/**
 * 归并排序主要思想：将原始数组切分成较小的数组，直到每一个小数组只有1个位置，接着将
 *                  小数组归并成较大的数组，并归过程也会完成排序，直到最后只有一个排序完毕的大数组
 */

 
var arr1 = [1, 4, 5, 7, 2, 9, 6, 3, 9,8];


function merge(left, right) {
    var result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
            result.push(left.shift());
        }
        else {
            result.push(right.shift());
        }
    }
    // 解决奇数数组剩余问题
    return result.concat(left).concat(right);
}

function mergeSort(arr) {
    if (arr.length == 1) { return arr };
    // Math.floor向下取整
    var mid = Math.floor(arr.length / 2);
    // 分半排序
    var left_arr = arr.slice(0, mid), right_arr = arr.slice(mid);
    //mergeSort()递归，将数组划分成单元素小数组，并且递归成merge(item_left,item_right)
    return merge(mergeSort(left_arr), mergeSort(right_arr));
}

console.log(mergeSort(arr1));