<!-- 商家分布：地图 -->
<template>
    <div class="b-container">
      <!-- 图表容器 -->
      <div ref="map" class="b-chart">
      </div>
    </div>
    </template>
    <script setup lang="ts">
    // 返回省份地图信息的方法
    import {getProvinceMapInfo} from '@/utils/map_utils'
    // 导入axios
    import { mapService } from '@/api/map'
    // 导入原生axios
    import axios2 from 'axios'
    // 组合式api
    import {onMounted, ref,defineExpose} from 'vue'
import { ECharts } from 'echarts/types/dist/echarts'
import useCurrentInstance from "@/utils/useCurrentInstance";

    const { proxy } = useCurrentInstance()
    // 定义一个ref对象指向一个容器
    let map = ref<HTMLElement>()
    // 定义echarts对象
    let myChart:ECharts
    // 定义数据
    let myData = ref<any>()
    // 标题大小（用于控制自适应）
    let titleSize = ref(50)
    // 初始化数据
    let initData = async ()=>{
      // 获取商家信息
      let {data} = await mapService()
      myData.value = data
      // 获取地图数据
      let ret = await axios2.get('/static/map/china.json')
      // 注册地图数据
      window.echarts.registerMap('china',ret.data)
      
      // 初始化echarts对象
      initChart()
      // 调整图表中的自适应部分
      adaptionChart()
    }
    // 初始化echarts对象
    let initChart = ()=>{
      // 初始化
      myChart = window.echarts.init((map.value as HTMLElement),'chalk');
      // 给myChart注册点击事件
      myChart.on('click',async (e)=>{
        // 获胜省份地图的key和path
        let ret = getProvinceMapInfo(e.name)
        if(ret){
          let {key,path} = ret
          // 发送请求，获取省份地图数据
          let {data} = await axios2.get(path)
          // 将省份地图数据注册给echarts
          window.echarts.registerMap(key,data)
          // 更新地图显示
          myChart.setOption({
            geo:{
              // 指定地图数据
              map:key
            }
          }) 
        }
      });
      // 给图表容器注册双击事件
      (map.value as HTMLElement).addEventListener('dblclick',()=>{
        // 恢复到中国地图
        myChart.setOption({
          geo:{
            map:'china'
          }
        })
      })
  
      // 系列数据
      let seriesData = myData.value.map((r:any)=>{
        return {
          type:'effectScatter',
          name:r.name,
          // 涟漪动画配置
          rippleEffect:{
            number:3,
            scale:5,
            brushType:'stroke'
          },
          data:r.children,
          // 指定地图坐标系
          coordinateSystem:'geo'
        }
      })
  
      // 图例数据
      let legendData = myData.value.map((r:any)=>{
        return {
          name:r.name
        }
      })
  
      // 设置选项
      myChart.setOption({
        // 标题
        title:{
          text:'商家分布',
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
        // 配置地图数据
        geo:{
          // 指定地图数据
          map:'china',
          // 缩放比例
          zoom:1.1,
          // 地图区域
          itemStyle:{
            areaColor:'#2e72bf',
            borderColor:'#333'
          }
        },
        // 提示框
        tooltip: {
        },
        // 系列
        series: seriesData,
        // 图例组件
        legend:{
          data:legendData
        }
      })
    }
    // 自适应echarts对象
    let adaptionChart = ()=>{
      // 计算出自适应标题的大小（其他所有的自适应，都是根据该大小去计算的）
      titleSize.value = (map.value as HTMLElement).offsetWidth/100*3.5
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
          bottom:'5%',
          left:'5%',
          icon:'circle',
          orient:'vertical',
          // 图例大小
          itemWidth:titleSize.value/2,
          itemHeight:titleSize.value/2,
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
  </style>