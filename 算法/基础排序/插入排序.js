/**
 * 插入排序思想: 每次排一个数组项。
 *  最开始从第二项开始，与第一项比较是该插入到第一项前面or第一项后面
 *  然后从第三项排，第三项与前面排好的组比较大小后选择位置插入，
 *  然后排第四项，第四项与前面排好的组比较大小后选择位置插入。
 *  剩余同理
 * 
 *  排序小数组时，插入排序比选择排序和冒泡排序性能要好一点
 * 
 */

const insertionSort = (array) => {
    let length = array.length,
        j,
        temp;
    for(let i = 1; i < length; i ++) {
        j = i;
        temp = array[i];
        while(j>0 && array[j-1]>temp) {
            array[j] = array[j-1];
            j--;
        }
        array[j] = temp;
    }
}

let a = [2,7,6,9,1,45,36,75];
console.log(a)
insertionSort(a);
console.log(a)