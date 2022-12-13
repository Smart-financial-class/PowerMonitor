<template>
  <div class="home-view-box">
    <el-container>
      <el-header>
        <el-row :gutter="15" class="demo-radius">
          <el-col v-for="(radius, i) in radiusGroup" :key="i" :span="5" :xs="{ span: 12 }">
            <div class="border">
              <div class="title">{{ radius.name }}</div>
              <div class="value">{{ radius.num }}</div>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <!-- 集团列表 -->
      <div style="height: 60vh" class="main">
        <el-auto-resizer>
          <el-table :data="tableData" height="60vh" style="width: 100%">
            <el-table-column prop="公司" label="公司" width="180" />
            <el-table-column prop="车辆总数" label="车辆总数" width="180" />
            <el-table-column prop="监控车辆" label="监控车辆" width="180" />
            <el-table-column prop="监控车辆占比" label="监控车辆占比" width="180" />
            <el-table-column prop="出车总数" label="出车总数" width="180" />
            <el-table-column prop="出车总数占比" label="出车总数占比" />
          </el-table>
        </el-auto-resizer>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

const radiusGroup = ref([
  {
    name: "电动车总数",
    num: "126,560",
  },
  {
    name: "出车总数",
    num: "8,846",
  },
  {
    name: "监控车辆",
    num: "6,560",
  },
]);

const tableData = await new Promise((resolve, reject) => {
  axios.get("/api/homePageData")
    .then(res => {
      resolve(res.data.data.list)
    })
    .catch(err => {
      reject(err)
    });
});
</script>

<style scoped>
.demo-radius .title {
  color: var(--el-text-color-regular);
  font-size: 14px;
  margin: 10px 0;
  text-align: left;
}

.demo-radius .value {
  color: var(--el-text-color-primary);
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0;
  text-align: left;
}

.demo-radius .radius {
  height: 40px;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
}

.demo-radius .border {
  height: 70px;
  margin-top: 20px;
  padding: 5%;
  background-color: #fff;
}

.main {
  margin-top: 100px;
  margin-left: 20px;
}
</style>
