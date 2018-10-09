/**
 * 
 buffer (缓冲区)
    - buffer的结构和数组很像，操作的方法也和数组类似
    - 数组中不能存储二进制的文件，而buffer就是专门用来存储二进制数据的
        <Buffer 68 65 6c 6c 6f>
    - 使用 buffer不用引入模块，直接使用即可
    - 在buffer存储的都是二进制文件，但是在显示时都是以16进制的形式显示
    8bit = 1byte(字节)
    buffer中的一个元素，占用内存的一个字节（8bit) 0~255
    一个中文占用3个字节

    buffer的大小一旦确定，则不能修改，Buffers实际上是对底层内存的直接操作

*/
var str = "hello";

//将一个字符串保存到buffer中
var buf = Buffer.from(str);
console.log(buf);
console.log(buf.length);     //占用内存的大小
console.log(str.length);      //字符串的长度

//创建一个指定大小的buffer
//buffer构造函数都是不推荐使用的
var buf2 = Buffer.alloc(10);
//通过索引来操作buffer中的元素
buf2[0] = 88;
buf2[1] = 556;  //如果数字超过255将取二进制的后8位
buf2[2] = Oxaa; // 170 只要数字在控制台或页面输出一定是10进制


//buf.toString() 将缓冲区的数据转换为字符串
 //buffer中可能含有敏感数据 是别人用过的数据，分配空间时不清除数据
var buf3 = Buffer.allocUnsafe(10); 

