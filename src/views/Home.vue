<template>
   <div class="home">
    <div class="header">
        <div class="logo">Bing</div>
        <div class="title">大屏可视化demo</div>
        <div class="time">{{ time }}</div>
    </div>
    <div class="main">
        <div class="left">
        <!-- 地区销量 -->
            <div class="trend" :class="{ fullscreen: isTrend }">
                <Trend ref="trend"></Trend>
                <i v-if="isTrend" class="iconfont icon-compress-alt" @click="isTrend = false"></i>
                <i v-else class="iconfont icon-expand-alt" @click="isTrend = true"></i>
            </div>
            <!-- 商家销售 -->
            <div class="seller" :class="{ fullscreen: isSeller }">
                <Seller ref="seller"></Seller>
                <i v-if="isSeller" class="iconfont icon-compress-alt" @click="isSeller = false"></i>
                <i v-else class="iconfont icon-expand-alt" @click="isSeller = true"></i>
            </div>
        </div>
        <div class="center">
            <!-- 商家分布 -->
            <div class="map" :class="{ fullscreen: isMap }">
                <Map ref="map"></Map>
                <i v-if="isMap" class="iconfont icon-compress-alt" @click="isMap = false"></i>
                <i v-else class="iconfont icon-expand-alt" @click="isMap = true"></i>
            </div>
            <!-- 地区销售 -->
            <div class="rank" :class="{ fullscreen: isRank }">
                <Rank ref="rank"></Rank>
                <i v-if="isRank" class="iconfont icon-compress-alt" @click="isRank = false"></i>
                <i v-else class="iconfont icon-expand-alt" @click="isRank = true"></i>
            </div>
        </div>
        <div class="right">
      <!-- 热销商品 -->
      <div class="hot" :class="{fullscreen:isHot}">
        <Hot ref="hot"></Hot>
        <i v-if="isHot" class="iconfont icon-compress-alt" @click="isHot=false"></i>
        <i v-else class="iconfont icon-expand-alt" @click="isHot=true"></i>
      </div>
      <!-- 库存和销量 -->
      <div class="stock" :class="{fullscreen:isStock}">
        <Stock ref="stock"></Stock>
        <i v-if="isStock" class="iconfont icon-compress-alt" @click="isStock=false"></i>
        <i v-else class="iconfont icon-expand-alt" @click="isStock=true"></i>
      </div>
    </div>
    </div>
</div>
</template>

<script setup lang="ts">
import Trend from '@/components/Trend.vue'
import Seller from '@/components/Seller.vue';
import Map from '@/components/Map.vue';
import Rank from '@/components/Rank.vue';
import Hot from '@/components/Hot.vue'
import Stock from '@/components/Stock.vue'
import { nextTick, onMounted, ref, watch } from 'vue';
import { ECharts } from 'echarts';


let trend = ref<ECharts>()
let seller = ref<ECharts>()
let rank = ref<ECharts>()
let map = ref<ECharts>()
    let hot = ref<ECharts>()
let stock = ref<ECharts>()
// 是否全屏显示
let isTrend = ref<Boolean>(false)
let isSeller = ref<Boolean>(false)
let isMap = ref(false)
let isRank = ref(false)
let isHot = ref(false)
let isStock = ref(false)

// 监视全屏变化
watch(isTrend, () => {
    nextTick(() => {
        (trend.value as ECharts).resize()
    })
})
watch(isSeller, () => {
    nextTick(() => {
        (seller.value as ECharts).resize()
    })
})
watch(isMap,()=>{
  nextTick(()=>{
    (map.value as ECharts).resize()
  })
})
watch(isRank,()=>{
  nextTick(()=>{
    (rank.value as ECharts).resize()
  })
})

watch(isStock,()=>{
  nextTick(()=>{
    (stock.value as ECharts).resize()
  })
})
watch(isHot,()=>{
  nextTick(()=>{
    (hot.value as ECharts).resize()
  })
})


let time = ref<string>()
let showTime = () => {
    let repair0 = (val: number) => {
        return val >= 10 ? val : '0' + val
    }
    setInterval(() => {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        time.value = [year, month, day].map(r => repair0(r)).join('-') +
            ' ' + [hour, minute, second].map(r => repair0(r)).join(':')
    }, 1000);
}
onMounted(() => {
    // 显示时间
    showTime()
})

</script>

<style scoped lang="scss">
.home {
    width: 100vw;
    height: 100vh;
    background-color: #161522;
    color: white;
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;

    .header {
        height: 60px;
        background: url('@/assets/img/header_border_dark.png') no-repeat center bottom;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div {
            flex: 1;
        }

        .logo {
            font-size: 20px;
        }

        .title {
            text-align: center;
            font-size: 20px;
        }

        .time {
            text-align: right;
        }
    }

    .main {
        flex: 1;
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        height: 100%;

        i {
            position: absolute;
            top: 10px;
            right: 10px;
            transform: rotate(180deg);
            cursor: pointer;
            ;
        }

        .left {
            width: 27%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;

            .trend {
                height: 60%;
                position: relative;
            }

            .seller {
                height: 37%;
                position: relative;
            }
        }

        .center {
            width: 43%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .map {
                height: 64%;
                position: relative;
            }

            .rank {
                height: 33%;
                position: relative;
            }
        }

        .right {
            width: 27%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .hot {
                height: 53%;
                position: relative;
            }

            .stock {
                height: 44%;
                position: relative;
            }
        }
    }
}

// 全屏样式
.fullscreen {
    width: 100vw !important;
    height: 100vh !important;
    position: absolute !important;
    z-index: 1000 !important;
    left: 0 !important;
    top: 0 !important;
}
</style>