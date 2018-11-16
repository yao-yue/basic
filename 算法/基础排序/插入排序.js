/**
 * 插入排序思想: 每次排一个数组项。从左到右逐个排好。
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
        //选中这个要排的数据项,将其数据保存给temp
        temp = array[i];
        //自右向左插，直到插到比该数据项大的前面，循环条件在数据项前面一项比其小时停止。
        //从索引i开始，如果索引i前面的数据项大于array[i]时，把前面的array[i-1]的数据项向后挪一位，
        //再进行比较，前面如果还是比该项大时继续挪
        while(j>0 && array[j-1]>temp) {
            array[j] = array[j-1];
            j--;
        }
        //将temp保存的值赋给空出来的j索引的位置，此时的j索引位置是经过变换的，
        //最后相当与把所有比array[i]大的项往后挪，然后插入
        array[j] = temp;
    }
}

let a = [2,7,6,9,1,45,36,75];
console.log(a)
insertionSort(a);
console.log(a)