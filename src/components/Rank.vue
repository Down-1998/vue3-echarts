<!-- 销量排行：垂直柱状图 -->
<template>
    <div class="b-container">
      <!-- 图表容器 -->
      <div ref="rank" class="b-chart">
      </div>
    </div>
    </template>
    <script setup lang="ts">
    import { rankService} from '@/api/rank'
    import { ECharts } from 'echarts/types/dist/echarts'
    // 组合式api
    import {onMounted, ref,defineExpose} from 'vue'
    // 定义一个ref对象指向一个容器
    let rank = ref<HTMLElement>()
    // 定义echarts对象
    let myChart:ECharts
    // 定义数据
    let myData = ref<any>()
    // 标题大小（用于控制自适应）
    let titleSize = ref(50)
    // 起始位置
    let startIndex = 0
    // 结束位置
    let endIndex = 9
    // 定时器变量
    let timer:any
    // 开启定时器
    let start = ()=>{
      if(timer!=null) return
      timer.value = setInterval(() => {
        startIndex++
        endIndex++
        if(endIndex>myData.value.length-1){
          startIndex = 0
          endIndex = 9
        }
        // 更新图表数据
        updateChartData()
      }, 2000);
    }
    // 停止定时器
    let stop = ()=>{
      clearInterval(timer)
      timer = null
    }
  
    // 初始化数据
    let initData = async ()=>{
      let {data} = await rankService()
      // 对数据排序(降序)
      data.sort((a,b)=>b.value-a.value)
      myData.value = data
      // 初始化echarts对象
      initChart()
      // 更新echarts数据
      updateChartData()
      // 调整图表中的自适应部分
      adaptionChart()
      // 开启定时器
      start()
    }
    // 初始化echarts对象
    let initChart = ()=>{
      // 初始化
      myChart = window.echarts.init((rank.value as HTMLElement),'chalk');
      // 颜色数组
      let colorArr = [
        ['#0dab2e','#4df576'],
        ['#2e77c1','#24e3e5'],
        ['#5353ed','#a86de6'],
      ]
      // 给echarts注册事件
      myChart.on('mouseover',()=>{
        // 停止定时器
        stop()
      })
      myChart.on('mouseout',()=>{
        // 重新开启定时器
        start()
      })
      // 设置选项
      myChart.setOption({
        // 标题
        title:{
          text:'地区销售排行',
          left:'2%',
          top:'3%'
        },
        // 绘制图表区域
        grid:{
          top:'22%',
          left:'3%',
          right:'3%',
          bottom:'2%',
          containLabel:true
        },
        // x轴
        xAxis:{
          // 类目轴
          type:'category',
          // 类目数据
          data:myData.value.map((r:any)=>r.name)
        },
        // y轴
        yAxis:{
          // 数值轴
          type:'value'
        },
        // 提示框
        tooltip: {
        },
        // 系列
        series: [
          {
            // 柱状图
            type:'bar',
            // 数据
            data:myData.value,
            itemStyle:{
              color:({data:{value}})=>{
                // 当前颜色数组
                let currentColor = []
                if(value>300){
                  currentColor = colorArr[0]
                }else if(value>200){
                  currentColor = colorArr[1]
                }else{
                  currentColor = colorArr[2]
                }
                return new window.echarts.graphic.LinearGradient(0,0,0,1,[
                  {
                    color:currentColor[0],
                    offset:0,
                  },
                  {
                    color:currentColor[1],
                    offset:1   
                  }
                ])
              }
            },
          },
        ]
      })
    }
    // 更新echarts数据的方法
    let updateChartData = ()=>{
      // 设置选项
      myChart.setOption({
        //区域缩放 
        dataZoom:{
          // 隐藏滚动条
          show:false,
          // 开始位置
          startValue:startIndex,
          // 结束位置
          endValue:endIndex
        },
      })
    }
    // 自适应echarts对象
    let adaptionChart = ()=>{
      // 计算出自适应标题的大小（其他所有的自适应，都是根据该大小去计算的）
      titleSize.value = (rank.value as HTMLElement).offsetWidth/100*3.5;
      myChart.setOption({
        // 标题
        title:{
          textStyle:{
            // 标题大小
            fontSize:titleSize.value
          }
        },
        // 系列
        series: [
          {
            itemStyle:{
              // 设置柱的圆角
              barBorderRadius:[titleSize.value/2,titleSize.value/2,0,0],
            },
            // 设置柱的宽度
            barWidth:titleSize.value,
          }
        ],
        // 提示框
        tooltip: {
        }
      })
    }
    // 页面挂载完成
    onMounted(() => {
      // 初始化数据
      initData()
      // 注册窗口大小调整大小事件
      window.addEventListener('resize',()=>{
        resize()
      })
    })
    // 统一的自适应方法
    let resize = ()=>{
      // 调整图表大小
      myChart.resize()
      // 调整图表中的自适应部分
      adaptionChart()
    }
    // 暴露出去的方法
    defineExpose({
      resize
    })
  </script>
  <style scoped lang='scss'>
  </style>