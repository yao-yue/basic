/**
 * 快速排序主要思想：
 */


 
var arr1 = [2, 5, 7, 94, 6, 9, 2, 1, 7, 56];

function quickSort(arr, left, right) {
    if (left < right) {
        //选中最左边的为基点
        let i = left, j = right, base = arr[i];
        while (i < j) {
            //从右向左找到比base小的数索引 arr[j]
            while (i < j && arr[j] > base)
                j--;

            if (i < j)
                //这里用i++，被换过来的必然比x小，赋值后直接让i自加，不用再比较，可以提高效率
                // 挖出此数填前一个坑base\a[i]中
                arr[i++] = arr[j];

            //从左向右找到比base大的数索引 arr[i]
            while (i < j && arr[i] < base)
                i++;

            if (i < j)
                //这里用j--，被换过来的必然比x大，赋值后直接让j自减，不用再比较，可以提高效率
                arr[j--] = arr[i];
        }
        arr[i] = base;

        quickSort(arr, left, i - 1);
        quickSort(arr, i + 1, right);
    }
}

quickSort(arr1, 0, arr1.length-1);

console.log("quickSort")
console.log(arr1);