<!-- <template>
  <div class="home-view-box">
    Hello HomePage
  </div>
</template> -->
<template>
  <div class="home-view-box">
    <el-container>
      <el-header>
        <el-row :gutter="12" class="demo-radius">
          <el-col
            v-for="(radius, i) in radiusGroup"
            :key="i"
            :span="6"
            :xs="{ span: 12 }"
          >
            <div class="border">
                <div class="title">{{ radius.name }}</div>
                <div class="value">{{radius.num}}</div>
                <!-- <div
                  class="radius"
                  :style="{
                    borderRadius: radius.type
                      ? `var(--el-border-radius-${radius.type})`
                      : '',
                  }"
                /> -->
            </div>
          </el-col>
        </el-row>
      </el-header>

      <!-- 集团列表 -->
      <div style="height: 400px" class="main">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="data"
          :width="width"
          :height="height"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
    </el-container>
  </div>
</template>


<!-- <script>
import { ref } from 'vue'
export default {
  name: 'HomePage',
  setup() {
    return {}
  },
  
}

</script> -->
<script lang="ts" setup>
import { ref } from 'vue'

const radiusGroup = ref([
  {
    name: '电动车总数',
    num:'126,560'
  },
  {
    name: '出车总数',
    num: '8,846',
  },
  {
    name: '监控车辆',
    num: '6,560',
  },
])

const getValue = (type: string) => {
  const getCssVarValue = (prefix, type) =>
    getComputedStyle(document.documentElement).getPropertyValue(
      `--el-${prefix}-${type}`
    )
  return getCssVarValue('border-radius', type)
}
const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 200,
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(6)
const data = generateData(columns, 200)
</script>

<style scoped>
.demo-radius .title {
  color: var(--el-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
  text-align:left;
}
.demo-radius .value {
  color: var(--el-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
  text-align:left;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
}

.demo-radius .border {
  height: 70px;
  width: 70%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
  padding: 5%;
}
.main{
  margin-top: 100px;
  margin-left: 20px;
}
</style>