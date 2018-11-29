// 动态规划是将问题分解成相互依赖的子问题


// ****  01背包问题解决函数
function packMaxValue(capacity, weights, values, n) {
    let i, w, a, b, pmv = [];       
    for( i = 0; i <=n ; i++) {
        pmv[i] = [];      //初始化寻找最优的解决方案的矩阵  pmv[n+1][capacity+1]
    }

    for( i = 0; i <=n ; i++) {                  //依次循环物品
        for(w = 0; w <= capacity; w++) {        //逐步增加背包容量
            if(i == 0 || w == 0) {
                pmv[i][w] = 0;                 //初始化矩阵的第一行第一列为0 
            } else if (weights[i-1] <= w) {     // 约束条件该次循环的物品重量要小于背包容量
                a = values[i-1] + pmv[i-1][w-weights[i-1]];      //背包装该物体能够达到的最大体积  pmv[i-1][w-weights[i-1]]前面记忆出的容量最优解
                b = pmv[i-1][w];                //上一行的解
                pmv[i][w] = (a > b) ? a : b;    //进行比较如果背包装了循环的此物品时能达到的最大价值a小于上一行的最优则取上一行
            }else {
                pmv[i][w] = pmv[i-1][w];       //如果该次循环的物品重量要大于背包容量即取上一次的循环
            }
        }
    }
    // return pmv[n][capacity];
    return pmv;             //输出
}

let values = [3, 4, 5],
    weights = [2, 3, 4],
    capacity = 5,
    n = values.length;
console.log(packMaxValue(capacity, weights, values, n));
let pmv = packMaxValue(capacity, weights, values, n);


//显示函数
function findValues(n, capacity, pmv, weights, values) {
    let i = n, k = capacity;
    console.log('解决方案包含以下物品：');

    while(i > 0 && k > 0) {
        if( pmv[i][k] !== pmv[i-1][k]) {
            console.log(`物品${i},重量${weights[i-1]}价值${values[i-1]}`);
            i--;
            k = k -pmv[i][k];
        } else {
            i--;
        }
    }
    console.log(`总价值${pmv[n][capacity]}`)
}

//调用显示函数 ---------- 
findValues(n, capacity, pmv, weights, values);