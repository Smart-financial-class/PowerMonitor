<script setup>
// 调用高德地图api实现地图功能
import { apiKey } from '../config'
import { getCurrentInstance } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useRouter } from 'vue-router';

// 获取路由值
const router = useRouter().currentRoute.value.path;
console.log(router);

//进行地图初始化
function initMap() {
  AMapLoader.load({
    key: apiKey, // 申请好的Web端开发者Key，首次调用 load 时必填
    // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
    .then((AMap) => {
      const map = new AMap.Map("gaode-map", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 10, //初始化地图级别
        center: [120.374926, 30.310678], //初始化地图中心点位置
      });
      //添加插件
      AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye"], function () {
        //异步同时加载多个插件
        map.addControl(new AMap.HawkEye()); //显示缩略图
        map.addControl(new AMap.Scale()); //显示当前地图中心的比例尺
      });
      // 单击
      map.on("click", (e) => {
        // console.log(e);
        state.current_position = [e.lnglat.KL, e.lnglat.kT];
        state.path.push([e.lnglat.KL, e.lnglat.kT]);
        addMarker();

        addPolyLine();
        // 地图按照适合展示图层内数据的缩放等级展示
        // map.setFitView();
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
initMap();
</script>

<template>
  <div id="gaode-map"></div>
</template>

<style scoped lang="less">
#gaode-map {
  margin: 0px;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  transform: translate(-20px, -20px);
}
</style>
