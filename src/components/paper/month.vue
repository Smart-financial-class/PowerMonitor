<template>
	<div class="CarInfo-content-list" style="height: 500px">
				<el-auto-resizer>
					<template #default="{ height, width }">
						<el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
					</template>
				</el-auto-resizer>
			</div>
</template>

<script lang="tsx" setup>
	import {
		ref
	} from 'vue'
	import {
		Search,
		Delete,
		Edit,
		Share,
		Timer
	} from '@element-plus/icons-vue'
	import dayjs from 'dayjs'
	import {
		ElButton,
		ElIcon,
		ElTag,
		ElTooltip,
		ElCheckTag,
		TableV2FixedDir
	} from 'element-plus'

	import type {
		Column
	} from 'element-plus'

	import axios from 'axios'


	// 充电记录
	const setRouter = function(router: string) {
		this.$router.push(`/${router}`)
	}
	const mockTest = function() {
		axios.get("/api/getLowPowerCarList")
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			});
	}


	mockTest();

	const value = ref('')

	let id = 0

	const dataGenerator = () => ({
		stime: '18:00',
		spower: '75%',
		ftime: '20:30',
		fpower: '100%',
		power: '2h 30min',
		// state: '正常',
		// theoRange: '900公里',
		// todayRange: '5公里',
		// plate: '矿泉水 550ml',
	})

	const columns: Column < any > [] = [{
			key: 'plate',
			title: '报表类型',
			dataKey: 'plate',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: plate
			}) => <> 
				<ElCheckTag checked style = "margin-right: 8px" >
				plate </ElCheckTag>
			</>,
		},
		{
			key: 'stime',
			title: '报表时间',
			dataKey: 'stime',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: stime
			}) => <> {
				stime
			} </>,
		},
		{
			key: 'rspower',
			title: '下载',
			dataKey: 'spower',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: spower
			}) => <> {
				spower
			} </>,
		},
	]

	const data = ref(Array.from({
		length: 30
	}).map(dataGenerator))


</script>

<style scoped>
</style>