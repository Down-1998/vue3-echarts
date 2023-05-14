<!-- 热销商品：饼图 -->
<template>
    <div class="b-container">
      <!-- 图表容器 -->
      <div ref="hot" class="b-chart">
      </div>
      <!-- 底部标题 -->
      <div class="firstTitle" :style="{fontSize:titleSize+'px'}">{{firstTitle}}</div>
      <!-- 左箭头 -->
      <i :style="{fontSize:titleSize+'px'}" class="iconfont icon-arrow-down" @click="setActiveIndex('-')"></i>
      <!-- 右箭头 -->
      <i :style="{fontSize:titleSize+'px'}" class="iconfont icon-arrow-up" @click="setActiveIndex('+')"></i>
    </div>
    </template>
    <script setup lang="ts">
    // 导入axios
    import { HotService } from '@/api/hot'
    import { ECharts } from 'echarts/types/dist/echarts';
    // 组合式api
    import {onMounted, ref,computed,defineExpose} from 'vue'
    // import useCurrentInstance from "@/utils/useCurrentInstance";

    // const { proxy } = useCurrentInstance()
    // 定义一个ref对象指向一个容器
    let hot = ref<HTMLElement>()
    // 定义echarts对象
    let myChart:ECharts
    // 定义数据
    let myData = ref<any>()
    // 标题大小（用于控制自适应）
    let titleSize = ref(50)
    // 分类索引
    let activeIndex = ref(0)
    // 更新activeIndex的方法
    let setActiveIndex = (type:string)=>{
      if(type=="+"){
        if(++activeIndex.value>=myData.value.length){
          activeIndex.value = 0
        }
      }else{
        if(--activeIndex.value<=-1){
          activeIndex.value = myData.value.length-1
        }
      }
      // 更新echarts数据
      updateChartData()
    }
    // 一级标题
    let firstTitle = computed(()=>{
      if(myData.value){
        return myData.value[activeIndex.value].name
      }else{
        return ""
      }
    })
    // 初始化数据
    let initData = async ()=>{
      let {data} = await HotService()
      console.log(data);
      myData.value = data
      // 初始化echarts对象
      initChart()
      // 调整图表中的自适应部分
      adaptionChart()
    }
    // 初始化echarts对象
    let initChart = ()=>{
      // 初始化
      myChart = window.echarts.init((hot.value as HTMLElement),'chalk');
      // 设置选项
      myChart.setOption({
        // 标题
        title:{
          text:'热销商品销售金额占比统计',
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
        // 提示框
        tooltip: {
          formatter:(e:any)=>{
            //总数
            let total = e.data.value
            let str = '<div>'
            e.data.children.forEach((r:any)=>{
              str += `<div><span>${r.name}：</span><span>${(r.value/total*100).toFixed(0)+'%'}</span></div>`
            })
            str += '</div>'
            return str
          },
        },
        // 系列
        series: [
          {
            type:'pie',
            name:'女装',
            radius:'68%',
            // 控制饼图的位置
            center:['50%','60%'],
            // 文本标签
            label:{
              show:false
            },
            // 视觉引导线
            labelLine:{
              show:false
            },
            // 高亮状态的扇区和标签样式
            emphasis:{
              label:{
                show:true
              }
            },
            // 饼图的数据
            data:myData.value[activeIndex.value].children
          }
        ],
      })
    }
    // 更新echarts数据
    let updateChartData = ()=>{
      // 设置选项
      myChart.setOption({
        // 系列
        series: [
          {
            // 饼图的数据
            data:myData.value[activeIndex.value].children
          }
        ]
      })
    }
    // 自适应echarts对象
    let adaptionChart = ()=>{
      // 计算出自适应标题的大小（其他所有的自适应，都是根据该大小去计算的）
      titleSize.value = (hot.value as HTMLElement).offsetWidth/100*3.5
      myChart.setOption({
        // 标题
        title:{
          textStyle:{
            // 标题大小
            fontSize:titleSize.value
          }
        },
        // 图例组件
        legend:{
          top:'14%',
          icon:'circle',
          // 图例大小
          itemWidth:titleSize.value,
          itemHeight:titleSize.value,
          textStyle:{
            fontSize:titleSize.value/2
          },
          // 间隔
          itemGap:titleSize.value/2
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
    .b-container{
      position: relative;
    }
    .firstTitle{
      position: absolute;
      z-index: 999;
      bottom: 3%;
      right: 10%;
      color: white;
    }
    .iconfont{
      position: absolute;
      z-index: 999;
      color: white;
      top: 55%;
      cursor: pointer;
    }
    // 左箭头
    .icon-arrow-down{
      left: 10%;
    }
    // 右箭头
    .icon-arrow-up{
      right: 10%;
    }
    </style>