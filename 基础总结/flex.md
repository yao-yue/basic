-  容器：
   容器的布局方向
        容器的排列方向
        flex-flow 简写属性 是flex-direction和flex-wrap的简写
        flex-direction （控制主轴是哪一根）
        row    从左往右的x轴(reverse）相反
        column  从上往下的y轴(reverse）相反

- 富裕空间的管理
    只决定富裕空间的分配，不会把空间分配给item
    主轴
    justify-content 
    flex-start   在主轴的正方向上
    flex-end    在主轴的反方向上
    center      在两边
    space-between  在项目之间
    sapce-around    在项目两边	
    侧轴	
    align-items
    flex-start  在侧轴的正方向上
    flex-end               反方向上	
    center                  在两边
    baseline               基线对齐
    stretch                 等高布局 （前提项目没有高度）



-   容器：    flex-wrap            控制侧轴的方向，往侧轴方向堆砌
    控制换不换行
    nowrap   wrap  wrap-reverse
    align-content    	控制侧轴上的排列
    多行多列时看这个
    单行单列时看align-items
    控制多行多列时富裕空间的管理，会把所有		行、列看成一个整体来不会把富裕空间分配在行与行之间
    flex-flow		是flex-direction和flex-wrap的简写

    项目  以下都是针对单个item的

            order                 item排序
    align-self		  item在侧轴上的排列方向
    flex-shrink 收缩因子  默认值为1
    flex-basis 拉伸因子  没写则flex-basis默认为width 
    flex  