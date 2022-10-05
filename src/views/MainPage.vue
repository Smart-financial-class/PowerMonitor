<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  FolderAdd,
  User
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const isCollapse = ref(false)
const changeMenu = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="page">
    <el-container class="container">
      <el-aside width="200px">
        <div class="logo-title">
          <div class="logo-icon">
            <img src="../assets/logo.png" alt="logo" />
          </div>
          <div class="logo-text">电量监控</div>
        </div>
        <el-menu
          active-text-color="#fff"
          background-color="rgb(13, 28, 44)"
          text-color="rgb(140, 147, 155)"
          default-active="1-1"
          class="aside-menu"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>电量监控</span>
            </template>
            <el-menu-item index="1-1" @click="setRouter('home')">首页</el-menu-item>
            <el-menu-item index="1-2" @click="setRouter('carinfo')">车辆详情</el-menu-item>
            <el-menu-item index="1-3" @click="setRouter('lowpower')">低电量车列表</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2" @click="setRouter('map')">
            <el-icon><location /></el-icon>
            <span>地图分布</span>
          </el-menu-item>
          <el-menu-item index="3" @click="setRouter('monitor')">
            <el-icon><document /></el-icon>
            <span>车辆监控</span>
          </el-menu-item>
          <el-menu-item index="4" @click="setRouter('statistics')">
            <el-icon><setting /></el-icon>
            <span>统计分析</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="top-line">
          <el-icon @click="changeMenu"><FolderAdd /></el-icon>
          <div class="user-icon">
            Username
            <el-icon><User /></el-icon>
          </div>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    setRouter (router: string) {
      this.$router.push(`/${router}`)
    }
  }
}
</script>


<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;

  .container {
    height: 100vh;

    .logo-title {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .logo-icon {
        height: 80%;
        margin: 0 10px;
        img {
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .logo-text {
      font-size: 20px;
      color: #fff;
      font-weight: 400;
    }

    .el-aside {
      background-color: rgb(13, 28, 44);
      overflow: hidden;
      .el-menu {
        width: 202px;
      }
      :deep(.is-active) {
        background-color: rgb(69, 141, 247) !important;
      }
    }

    .top-line {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .el-main {
      // background-color: rgb(228, 228, 228);
    }
  }
}
</style>
