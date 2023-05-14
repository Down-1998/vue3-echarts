<!-- 销量趋势：折线图 -->
<template>
    <div class="b-container">
      <!-- 分类下拉框 -->
      <div class="type">
        <select :style="{fontSize:titleSize+'px'}" v-model="chooseType">
          <option v-for="item in typeData" :key="item.key" :value="item.key">{{item.text}}</option>
        </select>
        <!-- 下拉框箭头 -->
        <i :style="{fontSize:titleSize+'px'}" class="iconfont icon-arrow-right"></i>
      </div>
      <!-- 图表容器 -->
      <div ref="thend" class="b-chart">
      </div>
    </div>
    </template>
    <script setup lang="ts">
    import { trend } from '@/api/Trend'
    import {typeDataType} from '@/types/Trend'
    import {onMounted, ref,computed,watch,defineExpose, shallowRef} from 'vue'
    import { ECharts } from 'echarts';
    import useCurrentInstance from "@/utils/useCurrentInstance";


    const { proxy } = useCurrentInstance()
    // 定义一个ref对象指向一个容器
    let thend = ref<HTMLElement>()
    // 定义echarts对象
    let myChart = shallowRef<ECharts>()
    // 定义数据
    let myData = ref<any>(null)
    // 选择的分类
    let chooseType = ref('map')
    // 标题大小（用于控制自适应）
    let titleSize = ref(50)
    // 监视chooseType
    watch(chooseType,()=>{
      // 初始化echarts对象
      initChart()
    })
    // 分类数据
    let typeData = computed(():typeDataType=>{
      if(myData.value){
        return myData.value.type
      }
      return [] as typeDataType
    })
    // 初始化数据
    let initData = async ()=>{
      let {data} = await trend()
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
      myChart.value = window.echarts.init((thend.value as HTMLElement),'chalk')
      // 颜色数组
      // 渐变的起始颜色
      let color1 = [
        '#0ba82c7f',
        '#2c6eff7f',
        '#16f2d97f',
        '#fe211e7f',
        '#fa69007f',
      ]
      // 渐变的终止颜色
      let color2 = [
        '#0ba82c00',
        '#2c6eff00',
        '#16f2d900',
        '#fe211e00',
        '#fa690000',
      ]
      // 准备系列数据
      let seriesData = myData.value[chooseType.value].data.map((r:any,i:number)=>{
        return {
          // 折线图
          type:'line',
          // 堆叠折线图
          stack:'value',
          // 系列名称
          name:r.name,
          // 系列数据
          data:r.data,
          // 面积折线图
          areaStyle:{
            color:new proxy.$charts.graphic.LinearGradient(0,0,0,1,[
              {
                color:color1[i],
                // 起始
                offset:0
              },
              {
                color:color2[i],
                // 结束
                offset:1
              }
            ])
          }
        }
      })
    
      myChart.value.setOption({
        // 绘制图表区域
        grid:{
          top:'30%',
          left:'3%',
          right:'3%',
          bottom:'2%',
          containLabel:true
        },
        // 提示框
        tooltip: {
          // 鼠标悬停显示
          trigger:'axis'
        },
        // X轴
        xAxis: {
          // 折线图顶格
          boundaryGap: false,
          // X轴数据
          data: myData.value.common.month
        },
        // Y轴
        yAxis: {},
        // 系列
        series: seriesData,
      })
    }
    // 自适应echarts对象
    let adaptionChart = ()=>{
      // 计算出自适应标题的大小（其他所有的自适应，都是根据该大小去计算的）
      titleSize.value = (thend.value as HTMLElement).offsetWidth/100 * 3.5;
      (myChart.value as ECharts).setOption({
        // 图例组件
        legend:{
          left:'2%',
          top:'14%',
          icon:'circle',
          // 图例大小
          itemWidth:titleSize.value,
          itemHeight:titleSize.value,
          textStyle:{
            fontSize:titleSize.value/2,
            color:'#ccc'
          },
          itemGap:titleSize.value
        }
      })
    }
    // 页面挂载完成
    onMounted(() => {
      // titleSize.value = thend.value.offsetWidth/100*3.5
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
      (myChart.value as ECharts).resize()
      // 调整图表中的自适应部分
      adaptionChart()
    }
    
    // 暴露给父组件使用的成员
    defineExpose({
      resize
    })
    </script>
    <style scoped lang='scss'>
    .b-container{
      position: relative;
    }
    .type{
      position: absolute;
      z-index: 999;
      left: 3%;
      top: 3%;
      display: flex;
      align-items: center;
      select{
        border: none;
        background-color: transparent;
        color: white;
        // 取消下拉框原生箭头
        appearance:none;
        option{
          background-color: #222733;
        }
      }
      .iconfont{
        margin-left: 10px;
      }
    }
    .iconfont{
      color: white;
    }
    </style>